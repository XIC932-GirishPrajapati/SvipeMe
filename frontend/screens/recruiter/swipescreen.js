import React, {useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import SwipeBottom from '../../components/ITEM/SwipeBottom';
import SwipeCard from '../../components/ITEM/Recruiter/recswipecard';
import SwipeScreenHead from '../../components/ITEM/Recruiter/recswipeHead';
import Color from '../../Constants/Color';
import {DUMMY_JOBS} from '../../Dummy/dummy';
import {useSelector} from 'react-redux'

const RecSwipeSCreen = (props) => {
  const swipeRef = useRef();
  const state = useSelector(state => state);
  console.log(state)
  
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <SwipeScreenHead back={true} onPress={()=>props.navigation.goBack()} onClick={()=>props.navigation.navigate('message')} props={props} />
        <View>
          <View style={styles.swipercontainer}>
            <Swiper
              ref={swipeRef}
              cardIndex={0}
              backgroundColor="white"
              animateCardOpacity
              disableTopSwipe={true}
              cards={DUMMY_JOBS}
              renderCard={job => {
                return <SwipeCard job={job} />;
              }}
              onSwiped={cardIndex => {
                console.log(cardIndex);
              }}
              onSwipedLeft={() => {
                console.log('Left');
              }}
              onSwipedRight={() => {
                console.log('Right');
              }}
              onSwipedBottom={() => {
                console.log('Bottom');
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
              }}
              stackSize={3}></Swiper>
          </View>
        </View>
      </View>
      <SwipeBottom
        onRefresh={() => swipeRef.current.jumpToCardIndex(0)}
        onCross={() => swipeRef.current.swipeLeft()}
        onHeart={() => swipeRef.current.swipeRight()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    flex: 9,
    backgroundColor: Color.white,
  },
});
export default RecSwipeSCreen;
