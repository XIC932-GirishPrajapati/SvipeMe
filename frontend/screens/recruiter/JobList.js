import React, {useState,useReducer,useCallback,useEffect,useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  FlatList,
  Animated,
  KeyboardAvoidingView,
  BackHandler

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useSelector} from 'react-redux';

import JoblistItem from '../../components/ITEM/JoblistItem';
import Color from '../../Constants/Color';
import SwipeScreenHead from '../../components/ITEM/Recruiter/recswipeHead';
import Input from '../../components/UI/inputWithLabel'
import NextButton from '../../components/UI/NextButton';
import OnBoard from '../../components/UI/Onboard';
import AddJobHead from '../../components/ITEM/Recruiter/AddJobHead';

const GETURL="https://wise-termite-35.loca.lt/api/recruiter/profile"
const POSTURL='https://wise-termite-35.loca.lt/api/recruiter/addjob'
const REDUCER_UPDATE = 'UPDATE';

const DATA=[{
  id:'position',
  image:require('../../assests/step1.png'),
  inputs:[  { id:"position",
  label:" I want to Hire A",
  required:true,
  placeholder:"TeleCaller",
  errorText:"Please enter a Valid  posistion.",
  initialValue:"",
  keyboardType:"default"},
  
  { id:"location",
  label:" Location",
  required:true,
  placeholder:"KolKata",
  errorText:"Please enter a Valid  location.",
  initialValue:"",
  keyboardType:"default"},

  { id:"organization",
  label:" organization",
  required:true,
  placeholder:"Google",
  errorText:"Please enter a Valid  organization.",
  initialValue:"",
  keyboardType:"default"}
]
},
{
  id:'2',
  image:require('../../assests/step2.png'),
  inputs:[{
    id:"skills",
    label:"Required Skills",
    required:true,
    placeholder:"Eg. Java Python",
    errorText:"Please enter a Valid skills.",
    initialValue:"",
    keyboardType:"default"
  },
  {
    id:"minExperiance",
    label:"Required minExperiance",
    required:true,
    placeholder:"Eg. 2 years",
    errorText:"Please enter a Valid minExperiance.",
    initialValue:"",
    keyboardType:"default"
  },
  {
    id:"lastdate",
    label:"Lastdate",
    required:true,
    placeholder:"22/02/2022",
    errorText:"Please enter a Valid lastdate.",
    initialValue:"",
    keyboardType:"default",
    date:true
  },
]
},
{
  id:'3',
  image:require('../../assests/step3.png'),
  inputs:[
    {
      id:"salary",
      label:"Expected Salary",
      required:true,
      placeholder:"Eg. 2 years",
      errorText:"Please enter a Valid salary.",
      initialValue:"",
      keyboardType:"default"
    },
    {
      id:"requirement",
      label:"Describe the Job Role",
      required:true,
      placeholder:"Guys I am going to update my linkedin in coming month, so you all are invited to my linkedin page and show your presence by endorsing my skills.",
      errorText:"Please enter a Valid requirement.",
      initialValue:"",
      keyboardType:"default",
      multiline:true

    },
  ]
 
}]

const fromReducer = (state, action) => {
  if (action.type === REDUCER_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updateValidiies = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;
    for (const key in updateValidiies) {
      updatedformIsValid = updatedformIsValid && updateValidiies[key];
    }
    return {
      // ...state,
      formIsValid: updatedformIsValid,
      inputValidities: updateValidiies,
      inputValues: updateValues,
    };
  }
  return state;
};


const JobList = props => {
  const [showmodal, setshowmodal] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [loading,setLoading]=useState(false)
  const [refresh,setRefresh]=useState(false)
  const [jobs,setjobs]=useState([]);
  const [loadedFirsTime ,setLoadedFirstTime]=useState(true);
  //for the first time 

const [currentIndex ,setcurrentIndex]=useState(0)
const scrollX=useRef(new Animated.Value(0)).current;
const slideRef=useRef(null)
const viewableItemsChanged = useRef(({viewableItems})=> {
  setcurrentIndex(viewableItems[0].index)
  // Use viewable items in state or as intended
}).current
const viewConfigRef =useRef({ viewAreaCoveragePercentThreshold: 50 }).current


  const [jobstate,dispatchJobState] = useReducer(
    fromReducer,
    {
      inputValues: {
        position: "",
        organization: "",
        location: "",
        skills: "",
        minExperiance: "",
        requirement: "",
        lastdate: "",
        salary: ""
      },
      inputValidities: {
        position: false,
        organization: false,
        location: false,
        skills: false,
        minExperiance: false,
        requirement: false,
        lastdate: false,
        salary: false
      },
      formIsValid: false,
    },
  );
  const jobInputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      // console.log(jobstate);
      
      dispatchJobState({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchJobState],
  );


  const loadJobs=()=>{
    setRefresh(true);
    axios.get(GETURL,{ headers: { Authorization: `Bearer ${token}` } })
   .then(res=>{setjobs(res.data.existingRecruiter.jobs)
    console.log(res.data.existingRecruiter.jobs)
    setLoadedFirstTime(false);
  })
   .catch(err=>console.log(err))
   .finally(()=>setRefresh(false))
  }
  useEffect(()=>{
   loadJobs()
   console.log(jobs.length)
  },[])



  const onAddJobHandler=()=>{
    setLoading(true)
    console.log(jobstate.inputValues)
    const data={
      job:jobstate.inputValues
    }
    axios.patch(POSTURL,data,{ headers: { Authorization: `Bearer ${token}` } })
    .then(res=>{setjobs(res.data.existingRecruiter.jobs)
    console.log(res.data.existingRecruiter.jobs)
    })
    .catch(err=>console.log(err))
    .finally(()=>{
      loadJobs();
      setLoading(false)
      setshowmodal(false)
    })
    
  }


const onScrollTo=()=>{
  
  if(currentIndex<DATA.length-1){
     slideRef.current.scrollToIndex({index:currentIndex+1})
  }else{
    onAddJobHandler();
  }
}
const onScrollToBack=()=>{
  
  if(currentIndex>0){
     slideRef.current.scrollToIndex({index:currentIndex-1})
  }
}

useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
  return () => backHandler.remove()
}, [])

const FirstJob=(
  
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1,backgroundColor:'white'}}
    >

    <View  style={{flex:1}}>
    <AddJobHead onClick={onScrollToBack} onPress={()=>setshowmodal(false)}/>
    <FlatList
    data={DATA}
    horizontal
    bounces={false}
    pagingEnabled
    scrollEnabled={false}
    keyExtractor={(item)=>item.id}
    onScroll={Animated.event(
      // scrollX = e.nativeEvent.contentOffset.x
      [{ nativeEvent: {
           contentOffset: {
             x: scrollX
           }
         }
       }],{
         useNativeDriver:false
       }
    )}
    viewabilityConfig={viewConfigRef}
    onViewableItemsChanged={viewableItemsChanged}
    renderItem={({item})=><OnBoard jobInputChangeHandler={jobInputChangeHandler} item={item}/>}
    ref={slideRef}
    showsHorizontalScrollIndicator={false}
    />
    </View>
    {/* <Paginator scrollX={scrollX} data={DATA}/> */}
    <NextButton scrollTo={onScrollTo} loading={loading} percentage={(currentIndex+1)*(100/DATA.length)} />
  </KeyboardAvoidingView>
)

  const renderItem = ({ item }) => (
    <JoblistItem job={item} props={props}  />
  );

  if(loadedFirsTime&&jobs.length<1){
    return  <View style={styles.loading}>
    <ActivityIndicator size="large" color={Color.primary} />
  </View>
  }

  if(jobs.length<1||showmodal){
    console.log("LENGTH",jobs.length)
  return FirstJob;
}

  return (
    <View style={styles.screen}>
    <SwipeScreenHead  onClick={()=>props.navigation.navigate('message')}/>
    {jobs.length? <FlatList
       onRefresh={loadJobs}
      refreshing={refresh}
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />:
      <View style={styles.error}>
        <Text style={styles.errorText}>No Jobs Posted By you</Text>
        </View>
      }


        {/* modal for skill */}
        {/* <Modal
            animationType="fade"
            transparent={true}
            visible={showmodal}
            onRequestClose={() => {
              setshowmodal(!showmodal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ScrollView style={styles.modalInput}>
                <Input
                  id="position"
                  label="position"
                  required
                  placeholder="Your position"
                  errorText="Please enter a Valid position."
                  initialValue=""
                  onInputChange={jobInputChangeHandler}
                />
                <Input
                  id="organization"
                  label="organization"
                  required
                  placeholder="organiztaion"
                  errorText="Please enter a Valid organization."
                  initialValue=""
                  keyboardType="default"
                  onInputChange={jobInputChangeHandler}
                />
                 <Input
                  id="location"
                  label=" location"
                  required
                  placeholder="please enter location"
                  errorText="Please enter a Valid  location."
                  initialValue=""
                  keyboardType="default"
                  onInputChange={jobInputChangeHandler}
                />
                  <Input
                  id="skills"
                  label="skills"
                  required
                  placeholder="please enterskills"
                  errorText="Please enter a Valid skills."
                  initialValue=""
                  keyboardType="default"
                  onInputChange={jobInputChangeHandler}
                />
    
                  <Input
                  id="minExperiance"
                  label="minExperiance"
                  required
                  placeholder="please enterminExperiance"
                  errorText="Please enter a Valid minExperiance."
                  initialValue=""
                  keyboardType="default"
                  onInputChange={jobInputChangeHandler}
                />
             
                   <Input
                  id="lastdate"
                  label="lastdate"
                  required
                  placeholder="please enter lastdate"
                  errorText="Please enter a Valid lastdate."
                  initialValue=""
                  keyboardType="default"
                  onInputChange={jobInputChangeHandler}
                />
                   <Input
                  id="salary"
                  label="Expected Salary"
                  required
                  placeholder="please enterExpected Salary"
                  errorText="Please enter a Valid ."
                  initialValue=""
                  keyboardType="default"
                  onInputChange={jobInputChangeHandler}
                />
                    <Input
                  id="requirement"
                  label=" requirement"
                  required
                  placeholder="please enter requirement"
                  errorText="Please enter a Valid  requirement."
                  initialValue=""
                  keyboardType="default"
                  multiline
                  onInputChange={jobInputChangeHandler}
                />
               </ScrollView>
                <TouchableOpacity
                  activeOpacity={1}
                  disabled={loading}
                  style={styles.buttonStyle}
                  onPress={onAddJobHandler}>
                 {loading?<ActivityIndicator color="white"/>: <Text style={{color:Color.white}}>Add Job</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
    <TouchableOpacity style={styles.floatingbutton}  onPress={()=>setshowmodal(!showmodal)}>
    <Icon name='plus' size={30} color={Color.white} />
  </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {flex: 1},
  topHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
  },
  backContainer: {
    flexDirection: 'row',
    marginRight: '1%',
    marginBottom: '2%',
  },
  backText: {
    fontSize: 14,
    zIndex: 200,
    color: 'black',
  },
  icon: {
    color: 'black',
  },
  jobText: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },
  topHomeContainer: {
    borderRadius: 5,

    backgroundColor: '#E1E6EE',

    borderColor: '#E1E6EE',
    borderWidth: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  search: {
    width: '80%',
    marginHorizontal: '4%',
    borderColor: 'rgba(92, 97, 103, 0.7)',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: '5%',
  },
  icons: {
    marginTop: '5%',
    marginLeft: '1%',
  },
  filter: {
    marginTop: '4%',
  },
  filterIcon: {
    width: 25,
    height: 21,
  },
  floatingbutton:{
    borderWidth: 1,
    borderColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 70,
    backgroundColor:  Color.primary,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  buttonStyle: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: Color.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary,
    alignItems: 'center',
    marginTop: '10%',
  },
  modalInput:{
    width:"100%"
  },
  errorText:{
    fontSize:20
  },
  error:{
   justifyContent:'center',
   flexDirection:'row',
   marginVertical:'60%'
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  }
});

export default JobList;
