import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import Color from '../Constants/Color';
import React, {useState, useReducer, useCallback} from 'react';
import AuthHead from '../components/ITEM/AuthHead';
import Input from '../components/UI/inputWithLabel';
import BoldLines from '../assestsJSX/SignUp/BoldLine';
import SkillsItem from '../components/ITEM/SkillsItem';
import OutLinedButton from '../components/UI/OutlinedButton';
import CertificateItem from '../components/ITEM/CertificateItem';
import {useDispatch,useSelector} from 'react-redux';
import * as userDetailActions from '../store/action/UserDetails'
import DocumentPicker from 'react-native-document-picker';

const REDUCER_UPDATE = 'UPDATE';
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
const UserDetails = props => {
  const [skillAddModel, setSkillAddModel] = useState(false);
  const [certifcationModel, setCertifcationModel] = useState(false);
  const [skills, setSkills] = useState([]); //skill rating
  const [certicates, setcerticates] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const dispatch = useDispatch();
  const userId=useSelector(state=>state.auth.userId)

  const [profileState, dispatchprofileState] = useReducer(fromReducer, {
    inputValues: {
      name: '',
      dateofbirth: '',
      gender: '',
      pan: '',
      phonenumber: '',
    },
    inputValidities: {
      name: false,
      dateofbirth: false,
      gender: false,
      pan: false,
      phonenumber: false,
    },
    formIsValid: false,
  });

  const [proffesionalState, dispatchproffesionalState] = useReducer(
    fromReducer,
    {
      inputValues: {
        profileset: '',
        profile: '',
        destination: '',
        currentorg: '',
        ctc: '',
        location: '',
      },
      inputValidities: {
        profileset: false,
        profile: false,
        destination: false,
        currentorg: false,
        ctc: false,
        location: false,
      },
      formIsValid: false,
    },
  );

  const [certificatestate, dispatchCertificates] = useReducer(
    fromReducer,
    {
      inputValues: {
        name:'',
        platform:'',
        issuedate: '',
        expirydate: '',
        credential: '',
        imagelink:'https/ooi/oiuo'
      },
      inputValidities: {
        name:false,
        platform:false,
        issuedate: false,
        expirydate: false,
        credential: false,
      },
      formIsValid: false,
    },
  );
  const [skillState, dispatchSkillState] = useReducer(
    fromReducer,
    {
      inputValues: {
        name:'',
        rating:''
      },
      inputValidities: {
        name:false,
       rating:false
      },
      formIsValid: false,
    },
  );

  const personalInputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      // console.log(formState);
      
      dispatchprofileState({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchprofileState],
  );

  const proffesionalInputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      console.log(proffesionalState);
      dispatchproffesionalState({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchproffesionalState],
  );
 
 
  const skillChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      console.log(inputIdentifier, value, isValid)
      console.log(skillState)
      dispatchSkillState({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchSkillState],
  );
  const certificateChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      // console.log(certificatestate)
      dispatchCertificates({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchCertificates],
  );

  const onSelectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
      console.log(res)
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        console.log('Canceled');
      } else {
        // For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        
      }
    }
  };
  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormDatßa
   const db=   {
        uri: singleFile.uri,
        name: singleFile.name,
        type: singleFile.type,
      }
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('myfile', 'Image Upload');
      data.append('myfile', db);
      // Please change file upload URL

     
      let res = await fetch(
        'https://wise-termite-35.loca.lt/api/upload',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };


 const onSkillAdd=() => {
  setSkills(prevSkills=>[...prevSkills,skillState.inputValues])
  // console.log(skills);
  setSkillAddModel(!skillAddModel)
 }

 const onCertificateAdded = ()=>{
   setcerticates(prev=>[...prev,certificatestate.inputValues])
   setCertifcationModel(!certifcationModel)
  
 }
  const submitHandler = () => {
   dispatch(userDetailActions.setUserProfileDetails(profileState.inputValues,proffesionalState.inputValues,skills,certicates,userId))
  };
  return (
    <ScrollView style={styles.screen}>
      <AuthHead forgot props={props} />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.headText}>Personal Section</Text>
        </View>

        <View style={styles.inputs}>
          <Input
            id="name"
            label="Name"
            required
            placeholder="Write Your Full Name"
            errorText="Please enter a Valid Name."
            initialValue=""
            onInputChange={personalInputChangeHandler}
          />
          <Input
            id="dateofbirth"
            label="Date Of Birth"
            required
            placeholder="Your Date Of Birth"
            errorText="Please enter a DOB."
            initialValue=""
            onInputChange={personalInputChangeHandler}
          />
          <Input
            id="gender"
            label="gender"
            required
            placeholder="Your gender"
            errorText="Please enter a gender."
            initialValue=""
            onInputChange={personalInputChangeHandler}
          />
          <Input
            id="pan"
            label="PAN"
            required
            placeholder="Your PAN"
            errorText="Please enter a Valid PAN."
            initialValue=""
            onInputChange={personalInputChangeHandler}
          />
          <Input
            id="phonenumber"
            label="Phone Number"
            required
            placeholder="Your Phone Number"
            errorText="Please enter a Valid Phone Number."
            initialValue=""
            onInputChange={personalInputChangeHandler}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.buttonStyle}
            onPress={() => {}}>
            <Text style={styles.text}>Upload your Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.boldLines}></View>
        <View style={styles.textContainer}>
          <Text style={styles.headText}>Professional Section</Text>
        </View>
        {/* profile Section */}
        <View style={styles.inputs}>
          <Input
            id="profileset"
            label="ProfileSet"
            required
            placeholder="Your Date Of ProfileSet"
            errorText="Please enter a Valid Profileset"
            initialValue=""
            onInputChange={proffesionalInputChangeHandler}
          />
          <Input
            id="profile"
            label="Profile"
            required
            placeholder="Your Date Of Profile"
            errorText="Please enter a Valid Profile"
            initialValue=""
            onInputChange={proffesionalInputChangeHandler}
          />
          <Input
            id="destination"
            label="destination"
            required
            placeholder="Your destination"
            errorText="Please enter a destination."
            initialValue=""
            onInputChange={proffesionalInputChangeHandler}
          />
          <Input
            id="currentorg"
            label="Current Org"
            required
            placeholder="Your currentorg"
            errorText="Please enter a Valid currentorg."
            initialValue=""
            onInputChange={proffesionalInputChangeHandler}
          />
          <Input
            id="ctc"
            label="CTC"
            required
            keyboardType="numeric"
            placeholder="Your ctc"
            errorText="Please enter a Valid ctc."
            initialValue=""
            onInputChange={proffesionalInputChangeHandler}
          />
          <Input
            id="location"
            label="Location"
            required
            placeholder="Your Location"
            errorText="Please enter a Valid Location."
            initialValue=""
            onInputChange={proffesionalInputChangeHandler}
          />

       { singleFile? <TouchableOpacity
            activeOpacity={0.6}
            style={styles.buttonStyle}
            onPress={uploadImage}>
            <Text style={styles.text}>Upload Resume</Text>
          </TouchableOpacity>:<TouchableOpacity
            activeOpacity={0.6}
            style={styles.buttonStyle}
            onPress={onSelectFile}>
            <Text style={styles.text}>Select Resume</Text>
          </TouchableOpacity>}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.boldLines}></View>
        <View style={styles.textContainer}>
          <Text style={styles.headText}>Skills</Text>
        </View>
        <View style={styles.skillsContainer}>
          {/* <SkillsItem star={3} skill="Java" />
          <SkillsItem star={1} skill="AWS" />
          <SkillsItem star={2} skill="Python" />
          <SkillsItem star={4} skill="React-Native" />
          <SkillsItem star={5} skill="ML" /> */}
          {skills.map((skill)=><SkillsItem star={skill.rating} key={skill.name} skill={skill.name} />)}
        </View>
        <View style={styles.buttons}>
          {/* modal for skill */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={skillAddModel}
            onRequestClose={() => {
              setSkillAddModel(!skillAddModel);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Input
                  id="name"
                  label="Skill"
                  required
                  placeholder="Your skill"
                  errorText="Please enter a Valid Skill."
                  initialValue=""
                  onInputChange={skillChangeHandler}
                />
                <Input
                  id="rating"
                  label="Rating"
                  required
                  placeholder="rate your skill 1 to 5"
                  errorText="Please enter a Valid Rating."
                  initialValue=""
                  keyboardType="numeric"
                  onInputChange={skillChangeHandler}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.buttonStyle}
                  onPress={onSkillAdd}>
                  <Text style={styles.text}>Add Skill</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* modal for skill */}
          <OutLinedButton
            title="Add more"
            onClick={() => setSkillAddModel(!skillAddModel)}
          />
          <OutLinedButton
            title=" See more skills"
            onClick={() => props.navigation.navigate('allskill')}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.boldLines}></View>
        <View style={styles.textContainer}>
          <Text style={styles.headText}>Certificates</Text>
        </View>
        <View style={styles.skillsContainer}>
          {certicates.map((course)=>(<CertificateItem course={course.name} key={Math.random()*100}/>))}
         
        </View>
        {/* model for certifcationModel */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={certifcationModel}
          onRequestClose={() => setCertifcationModel(!certifcationModel)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            {/* name:'',
        platform:'',
        issuedate: '',
        expirydate: '',
        credential: '', */}
              <Input
                id="name"
                label="Certicate Name"
                required
                placeholder="Name of the certificate"
                errorText="Please enter a Valid certificate Name"
                initialValue=""
                onInputChange={certificateChangeHandler}
              />
              <Input
                id="platform"
                label="Platform"
                required
                placeholder="Platform like Udemy"
                errorText="Please enter a Valid Platform."
                initialValue=""
                onInputChange={certificateChangeHandler}
              />
              <Input
                id="issuedate"
                label="issuedate"
                required
                placeholder="issuedate like 12/2/2000"
                errorText="Please enter a Valid issuedate."
                initialValue=""
                onInputChange={certificateChangeHandler}
              />
              <Input
                id="expirydate"
                label="expirydate"
                required
                placeholder="expirydate like 12/2/2000"
                errorText="Please enter a Valid expirydate."
                initialValue=""
                onInputChange={certificateChangeHandler}
              />
              <Input
                id="credential"
                label="Credentail Link"
                required
                placeholder="url of certificate"
                errorText="Please enter a Valid url."
                initialValue=""
                onInputChange={certificateChangeHandler}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonStyle}
                onPress={onCertificateAdded}>
                <Text style={styles.text}>Add Certificate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* model for certifcationModel */}
        <View style={styles.buttons}>
          <OutLinedButton
            title="Add more"
            onClick={() => setCertifcationModel(!certifcationModel)}
          />
          <OutLinedButton
            title=" See more "
            onClick={() => props.navigation.navigate('allcerticate')}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.line}></View>
          <TouchableOpacity>
            <Text style={styles.boldText}>Add Recomandations</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity>
            <Text style={styles.boldText}>Add Pictures</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
        <View style={styles.seeAll}>
          <OutLinedButton title=" See all" />
        </View>
        <View style={styles.boldLines}></View>
        <View style={styles.finalUpdate}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.buttonStyle}
            onPress={submitHandler}>
            <Text style={styles.text}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headText: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: '4%',
    color: '#27374F',
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#27374F',
    borderBottomWidth: 1,
  },
  inputs: {
    width: '90%',
    marginTop: '5%',
    marginHorizontal: '5%',
    justifyContent: 'center',
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
  text: {
    color: Color.white,
    fontWeight: '600',
  },
  boldLines: {
    marginVertical: '10%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  line: {
    marginVertical: '5%',
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
  },
  inputContainer: {width: '100%'},
  skillsContainer: {
    width: '90%',
    marginTop: '5%',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  seeAll: {
    flexDirection: 'row',
    flexDirection: 'row-reverse',
    marginHorizontal: '5%',
  },
  boldText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    opacity: 0.7,
    marginLeft: '5%',
  },
  finalUpdate: {
    marginBottom: '15%',
    width: '90%',
    marginHorizontal: '5%',
  },
  // Modal styles star here

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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UserDetails;
