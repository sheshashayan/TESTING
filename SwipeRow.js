import React, {
	Component,
	PropTypes,
} from 'react';
import {
	Animated,
	PanResponder,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';

const DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD = 2;
const PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;

/**
 * Row that is generally used in a SwipeListView.
 * If you are rendering a SwipeRow explicitly you must pass the SwipeRow exactly two children.
 * The first will be rendered behind the second.
 * e.g.
  <SwipeRow>
      <View style={hiddenRowStyle} />
      <View style={visibleRowStyle} />
  </SwipeRow>
 */
class SwipeRow extends Component {

	constructor(props) {
		super(props);
		this.horizontalSwipeGestureBegan = false;
		this.swipeInitialX = null;
		this.parentScrollEnabled = true;
		this.ranPreview = false;
		this.state = {
			dimensionsSet: false,
			hiddenHeight: 0,
			hiddenWidth: 0,
			translateX: new Animated.Value(0),

			stopLeftSwipe : this.props.rightOpenValue,
		};

		this.rowOnPressdisabled = false;
		this.once = false;
	}

	componentWillMount() {
		console.log("componentWillMount...")
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
			onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
			onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
			onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
			onShouldBlockNativeResponder: _ => false,
		});
	}

	getPreviewAnimation(toValue, delay) {

		console.log("getPreviewAnimation...")
		return Animated.timing(
			this.state.translateX,
			{ duration: this.props.previewDuration, toValue, delay }
		);
	}

	onContentLayout(e) {
		console.log("onContentLayout dimensionsSet..."+this.state.dimensionsSet);
		console.log("this.props.recalculateHiddenLayout..."+this.props.recalculateHiddenLayout);
		
		this.setState({
			dimensionsSet: !this.props.recalculateHiddenLayout,
			hiddenHeight: e.nativeEvent.layout.height,
			hiddenWidth: e.nativeEvent.layout.width,
		});

		if (this.props.preview && !this.ranPreview) {
			this.ranPreview = true;
			let previewOpenValue = this.props.previewOpenValue || this.props.rightOpenValue * 0.5;
			this.getPreviewAnimation(previewOpenValue, PREVIEW_OPEN_DELAY)
			.start( _ => {
				this.getPreviewAnimation(0, PREVIEW_CLOSE_DELAY).start();
			});
		}
	}

	/*onRowPress() {
		console.log("onRowPress...")
		if (this.props.onRowPress) {
			console.log("this.props.onRowPress "+this.props.onRowPress)
			this.props.onRowPress();
		} else {
			if (this.props.closeOnRowPress) {
				console.log("this.props.closeOnRowPress "+this.props.closeOnRowPress)
				this.closeRow();
			}
		}
	}*/

	handleOnMoveShouldSetPanResponder(e, gs) {
		console.log("handleOnMoveShouldSetPanResponder...")
		const { dx } = gs;
		return Math.abs(dx) > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD;
	}

	handlePanResponderMove(e, gestureState) {

		console.log("handlePanResponderMove...")
		
		const { dx, dy } = gestureState;
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);

		var leftStartsFrom = 0;

		// this check may not be necessary because we don't capture the move until we pass the threshold
		// just being extra safe here
		if (absDx > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD || absDy > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD) {
			if (absDy > absDx && !this.horizontalSwipeGestureBegan) {
				return;
			}

		if (this.swipeInitialX === null) {
				// set tranlateX value when user started swiping
				this.swipeInitialX = this.state.translateX._value
			}
			this.horizontalSwipeGestureBegan = true;

		let newDX = this.swipeInitialX + dx;


		if(newDX <= -40){
			newDX = this.state.stopLeftSwipe;
		 	//this.swipeLeftEndOnce = true;
		 	//this.swipeRightEndOnce = false;
		}

		if(newDX >= this.props.rightOpenValue && newDX <= 0 && this.once){
			newDX = 0;		
		}

		if (this.props.disableLeftSwipe  && newDX < 0) { 
				newDX = 0; 
			}
			
		if (this.props.disableRightSwipe && newDX > 0) { 
				newDX = 0; 
			}

		if (this.props.stopLeftSwipe && newDX > this.props.stopLeftSwipe){
			 	newDX = this.props.stopLeftSwipe; 
			}

		if (this.props.stopRightSwipe && newDX < this.props.stopRightSwipe){ 
				newDX = this.props.stopRightSwipe; 
			}

			this.setState({
				translateX: new Animated.Value(newDX)
			});

		}
	}

	handlePanResponderEnd(e, gestureState) {
		// re-enable scrolling on listView parent

		console.log("handlePanResponderEnd...");

		if(this.state.translateX._value === this.props.rightOpenValue){
			this.once = true;	
		}
		if(this.state.translateX._value === 0){

			this.once = false;
		}

		if (!this.parentScrollEnabled) {
			this.parentScrollEnabled = true;
			this.props.setScrollEnabled && this.props.setScrollEnabled(true);
		}

		// finish up the animation
		let toValue = 0;
		if (this.state.translateX._value >= 0) {
			// trying to open right
			if (this.state.translateX._value > this.props.leftOpenValue / 2) {
				// we're more than halfway
				toValue = this.props.leftOpenValue;
			}
		} else {
			// trying to open left
			if (this.state.translateX._value < this.props.rightOpenValue / 2) {
				// we're more than halfway
				toValue = this.props.rightOpenValue
			}
		}

		this.manuallySwipeRow(toValue);
	}

	closeRow() {
		console.log("closeRow...")
		this.manuallySwipeRow(0);
	}

	manuallySwipeRow(toValue) {		
		
		console.log("manuallySwipeRow this.props.toValue... "+this.props.toValue)
		console.log("this.props.friction... "+this.props.friction)
		console.log("this.props.tension... "+this.props.tension)
		
		Animated.spring(
			this.state.translateX,
			{
				toValue,
				friction: this.props.friction,
				tension: this.props.tension
			}
		).start( _ => {
			if (toValue === 0) {
				this.props.onRowDidClose && this.props.onRowDidClose();
			} else {
				this.props.onRowDidOpen && this.props.onRowDidOpen();
			}
		});

		if (toValue === 0) {
			this.props.onRowClose && this.props.onRowClose();
		} else {
			this.props.onRowOpen && this.props.onRowOpen(toValue);
		}

		// reset everything
		this.swipeInitialX = null;
		this.horizontalSwipeGestureBegan = false;
	}

	renderVisibleContent() {		
		//to handle the onPress event happening on partlist row/ cell
		const onPress = this.props.children[1].props.onPress;
		console.log("renderVisibleContent onPress ..."+onPress);

		if (onPress) {
			const newOnPress = _ => {
				onPress();
			}
			return React.cloneElement(
				this.props.children[1],
				{
					...this.props.children[1].props,
				}
			);
		}

		return (
			<View
				activeOpacity={1}
				onPress={ _ => this.onRowPress() } >
				{this.props.children[1]}
			</View>
		)

	}

	renderRowContent() {
		console.log('dimensionsSet.. '+this.state.dimensionsSet);
		if (this.state.dimensionsSet) {
			return (
				<Animated.View
					{...this.panResponder.panHandlers}
					style={[{transform: [ {translateX: this.state.translateX}]}]}>
					{this.renderVisibleContent()}
				</Animated.View>
			);
		} 
		else {
			return (
				<Animated.View
					{...this.panResponder.panHandlers}
					onLayout={ (e) => this.onContentLayout(e) }
					style={[ { transform: [{translateX: this.state.translateX}]} ]} >				
					{this.renderVisibleContent()}
				</Animated.View>
			);
		}
	}

	render() {
		console.log("props.children[0] "+this.props.children[0]);
		return (
			<View style={this.props.style ? this.props.style : styles.container}>
				<View style={[styles.hidden,{height: this.state.hiddenHeight,width: this.state.hiddenWidth}]}>
					{this.props.children[0]}
				</View>
				{this.renderRowContent()}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		// flex: 1
	},
	hidden: {
		bottom: 0,
		left: 0,
		overflow: 'hidden',
		position: 'absolute',
		right: 0,
		top: 0,
	},
});

SwipeRow.propTypes = {
	
	setScrollEnabled: PropTypes.func,
	
	onRowOpen: PropTypes.func,
  
  	onRowDidOpen: PropTypes.func,
	
	leftOpenValue: PropTypes.number,
	
	rightOpenValue: PropTypes.number,
	
	stopLeftSwipe: PropTypes.number,
	
	stopRightSwipe: PropTypes.number,
	
	friction: PropTypes.number,

	tension: PropTypes.number,
	
	closeOnRowPress: PropTypes.bool,
	
	disableLeftSwipe: PropTypes.bool,
	
	disableRightSwipe: PropTypes.bool,
	
	recalculateHiddenLayout: PropTypes.bool,
	
	onRowClose: PropTypes.func,
  
  	onRowDidClose: PropTypes.func,
	
	style: View.propTypes.style,
	
	preview: PropTypes.bool,
	
	previewDuration: PropTypes.number,
	
	previewOpenValue: PropTypes.number
};

SwipeRow.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	closeOnRowPress: false,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	recalculateHiddenLayout: false,
	preview: false,
	previewDuration: 300
};

export default SwipeRow;
