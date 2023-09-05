import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './style';
import {Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loadingcomponent} from '../Utilities/Loader';
import ImagePicker from 'react-native-image-crop-picker';
import {EventRegister} from 'react-native-event-listeners';
import DateTimePicker from '../Utilities/DateTimePicker';
import Moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile(props) {
  let mToken;
  let professionName;
  let myLinkId;

  var dataArray = [];

  const {navigation, loading} = props;

  const [myProfessionDATA, setProfessions] = useState([
    {id: '1', title: 'Producer', selected: false},
    {id: '2', title: 'Record Engineer', selected: false},
    {id: '3', title: 'Mixing / Master Engineer', selected: false},
    {id: '4', title: 'Singer / Songwriter', selected: false},
    {id: '5', title: 'Musician', selected: false},
    {id: '6', title: 'Loopmaker', selected: false},
    {id: '7', title: 'A&R', selected: false},
    {id: '8', title: 'Brand/Business', selected: false},
    {id: '9', title: 'Content Creater / ', selected: false},
    {id: '10', title: 'A&R', selected: false},
  ]);

  const [isLoading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');
  const [isVerified, setIsVerified] = useState('');

  const [bio, setBio] = useState('');
  const [myProfession, setMyProf] = useState('');
  const [enterName, setName] = useState('');
  const [myName, setMyName] = useState('');
  const [myProfessionProfile, setMyProfession] = useState('');
  const [profileUrl, setMyProfileUrl] = useState([]);
  const [linkId, setMyLinkId] = useState('');
  const [addLink, setAddLink] = useState('');
  const [profileLink, setProfileLink] = useState([]);
  const [dob, setDOB] = useState('');
  const [username, setUsername] = useState('');

  const [showDatePicker, setDatePicker] = useState(false);

  // Experience Data
  const [experienceData, setExperienceData] = useState([]);
  const [selectedExperienceData, setSelectedExperienceData] = useState([]);

  // Experience Platform Data
  const [experiencePlatforms, setExperiencePlatformData] = useState([]);
  const [selectedExperiencePlatformData, setSelectedExperiencePlatformData] =
    useState([]);

  // Experience Software  Data
  const [experienceSoftwareData, setExperienceSoftwareData] = useState([]);
  const [selectedExperienceSoftwareData, setSelectedExperienceSoftwareData] =
    useState([]);

  // Experience Data
  const [experienceInstrumentsData, setExperienceInstrumentsData] = useState(
    [],
  );
  const [
    selectedExperienceInstrumenntsData,
    setSelectedExperienceInstrumentsData,
  ] = useState([]);

  //Interest Data
  const [interestData, setInterestData] = useState([]);
  const [selectedInterestData, setSelectedInterestData] = useState([]);

  //Interest platform
  const [interestPlatformData, setInterestPlatformData] = useState([]);
  const [selectedInterestPlatformData, setSelectedInteretPlatformData] =
    useState([]);

  //Interest geners
  const [interestGenersData, setInterestGenersData] = useState([]);
  const [selectedInterestGenersData, setSelectedGenersData] = useState([]);

  //Interest softwares
  const [interestSoftwareData, setInterestSoftwareData] = useState([]);
  const [selectedInterestSoftwareData, setSelectedInterestSoftwareData] =
    useState([]);

  //
  const [linkData, setLinkData] = useState([]);

  // People Data
  const [peopleData, setPeopleData] = useState([]);
  const [selectedPeopleData, setSelectedPeopleData] = useState([]);

  //Communities Data
  const [communitiesData, setCommunityData] = useState([]);
  const [selectedCommunitiesData, setSelectedCommunitiesData] = useState([]);

  // Expertise Software
  const [expertiseSoftware, setExpertiseSoftware] = useState([]);
  const [selectedExpertiseSoftware, setSelectedExpertiseSoftware] = useState(
    [],
  );

  // Expertise Software
  const [expertiseInstruments, setExpertiseInstruments] = useState([]);
  const [selectedExpertiseInstruments, setSelectedExpertiseInstruments] =
    useState([]);

  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const [coverUri, setCoverUri] = React.useState(
    props.source?.coverUri || undefined,
  );

  const [selectedExpIdArray, setSelectedExpIdArray] = useState([]);
  const [selectedExpertiseIdArray, setSelectedExpertiseIdArray] = useState([]);
  const [selectedIntIdArray, setSelectedIntIdArray] = useState([]);
  const [selectedPeoIdArray, setSelectedPeoIdArray] = useState([]);

  const [expShowMore, setExPShowMore] = useState('');
  const [expPlatformShowMore, setExpPlatformShowMore] = useState('');
  const [expSoftShowMore, setExpSoftShowMore] = useState('');
  const [expInstShowMore, setExpInstShowMore] = useState('');
  const [expBeginShowMore, setExpBeginShowMore] = useState('');
  const [expInterShowMore, setExpInterShowMore] = useState('');
  const [expExpertShowMore, setExpExpertShowMore] = useState('');

  const [expertiseSoftShowMore, setExpertiseSoftShowMore] = useState('');
  const [expertiseInstShowMore, setExpertiseInstShowMore] = useState('');

  const [intPluginShowMore, setIntPluginShowMore] = useState('');
  const [intPlatformShowMore, setIntPlatformShowMore] = useState('');
  const [intGenersShowMore, setGenersShowMore] = useState('');
  const [intSoftwareShowMore, setIntSoftwareShowMore] = useState('');

  const [peoShowMore, setPeoShowMore] = useState('');
  const [commShowMore, setCommShowMore] = useState('');

  const expTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: '3-5 years',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const expIdTempArr = expTempArr.map(i => i.id);

  const expPlatformTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 4,
      name: 'BandCamp',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const expPlatformIdTempArr = expPlatformTempArr.map(i => i.id);

  const expSoftwareTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 4,
      name: 'Other',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const expSoftwareIdTempArr = expSoftwareTempArr.map(i => i.id);

  const expInstrumentsTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 4,
      name: 'Sampler',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const expInstrumentsIdTempArr = expInstrumentsTempArr.map(i => i.id);

  const interestTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: 'plugin',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const interestIdTempArr = interestTempArr.map(i => i.id);

  const interestPlatformTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: 'Bandcamp',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const interestPlatformIdTempArr = interestPlatformTempArr.map(i => i.id);

  const interestGenersTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: 'Rock',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const interestGenersIdTempArr = interestGenersTempArr.map(i => i.id);

  const interestSoftwareTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: 'Rock',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const interestSoftwareIdTempArr = interestSoftwareTempArr.map(i => i.id);

  const peopleTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: '808 mafia',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const peopleIdTempArr = peopleTempArr.map(i => i.id);

  const communitiesTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: '808 mafia',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const communitiesIdTempArr = communitiesTempArr.map(i => i.id);

  const expertiseSoftwareTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: '808 mafia',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const expertiseSoftwareIdTempArr = expertiseSoftwareTempArr.map(i => i.id);

  const expertiseInstumentsTempArr = [
    {
      created_at: '2023-08-06T08:40:42.000000Z',
      id: 1,
      name: '808 mafia',
      parent_id: '1',
      positions: '1',
      status: '1',
      updated_at: '2023-08-06T08:40:42.000000Z',
    },
  ];

  const expertiseInstrumentsIdTempArr = expertiseInstumentsTempArr.map(
    i => i.id,
  );

  const [dimensions, setDimensions] = useState({
    window: windowHeight,
    screen: windowWidth,
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    retrieveData();
    profileApi();
    getAdminCategories();
    getLinkList();
  }, []);

  const showExpMore = async () => {
    setExPShowMore(1);
  };

  const showExpLess = async () => {
    setExPShowMore('');
  };

  const showExpPlatMore = async () => {
    setExpPlatformShowMore(1);
  };

  const showExpPlatLess = async () => {
    setExpPlatformShowMore('');
  };

  const showExpSoftMore = async () => {
    setExpSoftShowMore(1);
  };

  const showExpSoftLess = async () => {
    setExpSoftShowMore('');
  };

  const showExpInstMore = async () => {
    setExpInstShowMore(1);
  };

  const showExpInstLess = async () => {
    setExpInstShowMore('');
  };

  const showExpBeginMore = async () => {
    setExpBeginShowMore(1);
  };

  const showExpBeginLess = async () => {
    setExpBeginShowMore('');
  };

  const showExpInterMore = async () => {
    setExpInterShowMore(1);
  };

  const showExpInterLess = async () => {
    setExpInterShowMore('');
  };

  const showExpExpertMore = async () => {
    setExpExpertShowMore(1);
  };

  const showExpExptertLess = async () => {
    setExpExpertShowMore('');
  };

  const showExpertiseSoftMore = async () => {
    setExpertiseSoftShowMore(1);
  };

  const showExpertiseSoftLess = async () => {
    setExpertiseSoftShowMore('');
  };

  const showExpertiseInstMore = async () => {
    setExpertiseInstShowMore(1);
  };

  const showExpertiseInstLess = async () => {
    setExpertiseInstShowMore('');
  };

  const showIntPluginMore = async () => {
    setIntPluginShowMore(1);
  };

  const showIntPluginLess = async () => {
    setIntPluginShowMore('');
  };

  const showIntPlatMore = async () => {
    setIntPlatformShowMore(1);
  };

  const showIntPlatLess = async () => {
    setIntPlatformShowMore('');
  };

  const showIntGenersMore = async () => {
    setGenersShowMore(1);
  };

  const showIntGenersLess = async () => {
    setGenersShowMore('');
  };

  const showIntSoftMore = async () => {
    setIntSoftwareShowMore(1);
  };

  const showIntSoftLess = async () => {
    setIntSoftwareShowMore('');
  };

  const showPeoMore = async () => {
    setPeoShowMore(1);
  };

  const showPeoLess = async () => {
    setPeoShowMore('');
  };

  const showCommMore = async () => {
    setCommShowMore(1);
  };

  const showCommLess = async () => {
    setCommShowMore('');
  };

  const ItemExp = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickcCategory(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemExpPlatform = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickExperiencePlatforms(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemExpSoftware = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickExperienceService(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemExpInstruments = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickExperienceInstrument(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemInrestPlugin = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickInterestPluginData(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemInrestPlatform = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickInterestPlatformData(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemInrestGeners = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickInterestGenersData(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemInrestSoftwares = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickInterestSoftwareData(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemPeople = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickPeopleData(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemCommunities = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickCommunitiesData(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemExpertiseSoftware = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickExpertiseSoftware(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemExpertiseInstruments = ({item, index}) => (
    <TouchableOpacity
      onPress={() => pickExpertiseInstruments(index)}
      style={[styles.item, item?.selected ? styles.itemSelected : {}]}>
      <View
      // style={styles.item}
      >
        <Text style={styles.title}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemLink = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setLinkId(item, index);
        this.RBSheetAddLink.open();
      }}
      style={[styles.itemLink, item?.selected ? styles.itemSelectedLink : {}]}>
      <View>
        <Text style={styles.titleLink}>{item?.link_name}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemLinkImage = (item, index) => (
    <Image
      resizeMode="cover"
      style={{
        height: 24,
        width: 24,
        marginHorizontal: 5,
        backgroundColor: 'red',
      }}
      source={{uri: item.link_image}}></Image>
  );

  const Item2 = ({title, i}) => (
    <TouchableOpacity onPress={() => setSelectedIndex(title, i)}>
      <View style={styles.item2}>
        <Text style={styles.title2}>{title}</Text>
        <View style={{width: '100%', height: 2, borderColor: 'red'}}></View>
      </View>
    </TouchableOpacity>
  );

  // pick industries experience
  function pickcCategory(i) {
    console.log(
      'selectedExperienceDataselectedExperienceData',
      selectedExperienceData,
    );
    console.log('index', i);
    let expData = JSON.parse(JSON.stringify(experienceData));
    let expDataIds = JSON.parse(JSON.stringify(selectedExperienceData));
    console.log('Exp new  array=...', expData, i);

    if (selectedExperienceData.length === 1) {
      if (expData[i].selected) {
        expData[i].selected = false;
        const index = expDataIds.indexOf(expData[i].id);
        if (index > -1) {
          expDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only one experience');
      }
    } else {
      if (expData[i].selected) {
        expData[i].selected = false;
        const index = expDataIds.indexOf(expData[i].id);
        if (index > -1) {
          expDataIds.splice(index, 1);
        }
      } else {
        expData[i].selected = true;
        if (expDataIds.indexOf(expData[i].id) < 0) {
          expDataIds.push(expData[i].id);
          selectedExpIdArray.push(expData[i].id);
          setSelectedExpIdArray[selectedExpIdArray];
        }
      }
    }

    console.log('expDataIdsexpDataIds', expDataIds);
    setExperienceData(expData);
    setSelectedExperienceData(expDataIds);

    console.log('selectedExpIds', selectedExpIdArray);
  }

  // pick experience platform
  function pickExperiencePlatforms(i) {
    console.log(
      'selectedExperiencePlatformData',
      selectedExperiencePlatformData,
    );

    console.log('index', i);
    let expPlatformData = JSON.parse(JSON.stringify(experiencePlatforms));
    let expPlatformDataIds = JSON.parse(
      JSON.stringify(selectedExperiencePlatformData),
    );
    console.log('Exp new  array=...', expPlatformData, i);
    if (selectedExperiencePlatformData.length === 10) {
      if (expPlatformData[i].selected) {
        expPlatformData[i].selected = false;
        const index = expPlatformDataIds.indexOf(expPlatformData[i].id);
        if (index > -1) {
          expPlatformDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (expPlatformData[i].selected) {
        expPlatformData[i].selected = false;
        const index = expPlatformDataIds.indexOf(expPlatformData[i].id);
        if (index > -1) {
          expPlatformDataIds.splice(index, 1);
        }
      } else {
        expPlatformData[i].selected = true;
        if (expPlatformDataIds.indexOf(expPlatformData[i].id) < 0) {
          expPlatformDataIds.push(expPlatformData[i].id);
          selectedExpIdArray.push(expPlatformData[i].id);
          setSelectedExpIdArray[selectedExpIdArray];
        }
      }
    }

    console.log('expPlatformIds', expPlatformDataIds);
    setExperiencePlatformData(expPlatformData);
    setSelectedExperiencePlatformData(expPlatformDataIds);

    console.log('selectedExpIds', selectedExpIdArray);
  }

  // pick experience software
  function pickExperienceService(i) {
    console.log(
      'selectedExperienceServiceData',
      selectedExperienceSoftwareData,
    );

    console.log('index', i);
    let expSoftwareData = JSON.parse(JSON.stringify(experienceSoftwareData));
    let expSoftwareDataIds = JSON.parse(
      JSON.stringify(selectedExperienceSoftwareData),
    );
    console.log('Exp new  array=...', expSoftwareData, i);
    if (selectedExperienceSoftwareData.length === 10) {
      if (expSoftwareData[i].selected) {
        expSoftwareData[i].selected = false;
        const index = expSoftwareDataIds.indexOf(expSoftwareData[i].id);
        if (index > -1) {
          expSoftwareDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (expSoftwareData[i].selected) {
        expSoftwareData[i].selected = false;
        const index = expSoftwareDataIds.indexOf(expSoftwareData[i].id);
        if (index > -1) {
          expSoftwareDataIds.splice(index, 1);
        }
      } else {
        expSoftwareData[i].selected = true;
        if (expSoftwareDataIds.indexOf(expSoftwareData[i].id) < 0) {
          expSoftwareDataIds.push(expSoftwareData[i].id);
          selectedExpIdArray.push(expSoftwareData[i].id);
          setSelectedExpIdArray[selectedExpIdArray];
        }
      }
    }
    console.log('expSoftwareIds', expSoftwareDataIds);
    setExperienceSoftwareData(expSoftwareData);
    setSelectedExperienceSoftwareData(expSoftwareDataIds);

    console.log('selectedExpIds', selectedExpIdArray);
  }

  // pick experience software
  function pickExperienceInstrument(i) {
    console.log(
      'selectedExperienceInstrumenteData',
      selectedExperienceInstrumenntsData,
    );

    console.log('index', i);
    let expInstrumentData = JSON.parse(
      JSON.stringify(experienceInstrumentsData),
    );
    let expInstrumenDataIds = JSON.parse(
      JSON.stringify(selectedExperienceInstrumenntsData),
    );
    console.log('Exp new  array=...', expInstrumentData, i);
    if (selectedExperienceInstrumenntsData.length === 10) {
      if (expInstrumentData[i].selected) {
        expInstrumentData[i].selected = false;
        const index = expInstrumenDataIds.indexOf(expInstrumentData[i].id);
        if (index > -1) {
          expInstrumenDataIds.splice(index, 1);
          selectedExpIdArray.pop(index, 1);
          setSelectedExpIdArray[selectedExpIdArray];
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (expInstrumentData[i].selected) {
        expInstrumentData[i].selected = false;
        const index = expInstrumenDataIds.indexOf(expInstrumentData[i].id);
        if (index > -1) {
          expInstrumenDataIds.splice(index, 1);
        }
      } else {
        expInstrumentData[i].selected = true;
        if (expInstrumenDataIds.indexOf(expInstrumentData[i].id) < 0) {
          expInstrumenDataIds.push(expInstrumentData[i].id);
          selectedExpIdArray.push(expInstrumentData[i].id);
          setSelectedExpIdArray[selectedExpIdArray];
        }
      }
    }

    console.log('expInstrumentsIds', expInstrumenDataIds);
    setExperienceInstrumentsData(expInstrumentData);
    setSelectedExperienceInstrumentsData(expInstrumenDataIds);

    console.log('selectedExpIds', selectedExpIdArray);
  }

  // pick interest Plugin data
  function pickInterestPluginData(i) {
    console.log('selectedInterestPluginData', selectedInterestData);

    console.log('index', i);
    let intData = JSON.parse(JSON.stringify(interestData));
    let intDataIds = JSON.parse(JSON.stringify(selectedInterestData));
    console.log('Exp new  array=...', intData, i);

    if (selectedInterestData.length === 10) {
      if (intData[i].selected) {
        intData[i].selected = false;
        const index = intDataIds.indexOf(intData[i].id);
        if (index > -1) {
          intDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (intData[i].selected) {
        intData[i].selected = false;
        const index = intDataIds.indexOf(intData[i].id);
        if (index > -1) {
          intDataIds.splice(index, 1);
        }
      } else {
        intData[i].selected = true;
        if (intDataIds.indexOf(intData[i].id) < 0) {
          intDataIds.push(intData[i].id);
          selectedIntIdArray.push(intData[i].id);
          setSelectedIntIdArray[selectedIntIdArray];
        }
      }
    }

    console.log('intPluginIds', intDataIds);
    setInterestData(intData);
    setSelectedInterestData(intDataIds);

    console.log('selectedIntIds', selectedIntIdArray);
  }

  // pick interest Plugin data
  function pickInterestPlatformData(i) {
    console.log('selectedInterestPlatformData', selectedInterestPlatformData);

    console.log('index', i);
    let intPlatData = JSON.parse(JSON.stringify(interestPlatformData));
    let intPlatDataIds = JSON.parse(
      JSON.stringify(selectedInterestPlatformData),
    );
    console.log('Exp new  array=...', intPlatData, i);
    if (selectedInterestPlatformData.length === 10) {
      if (intPlatData[i].selected) {
        intPlatData[i].selected = false;
        const index = intPlatDataIds.indexOf(intPlatData[i].id);
        if (index > -1) {
          intPlatDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (intPlatData[i].selected) {
        intPlatData[i].selected = false;
        const index = intPlatDataIds.indexOf(intPlatData[i].id);
        if (index > -1) {
          intPlatDataIds.splice(index, 1);
        }
      } else {
        intPlatData[i].selected = true;
        if (intPlatDataIds.indexOf(intPlatData[i].id) < 0) {
          intPlatDataIds.push(intPlatData[i].id);
          selectedIntIdArray.push(intPlatData[i].id);
          setSelectedIntIdArray[selectedIntIdArray];
        }
      }
    }

    console.log('intPlatformIds', intPlatDataIds);
    setInterestPlatformData(intPlatData);
    setSelectedInteretPlatformData(intPlatDataIds);

    console.log('selectedIntIds', selectedIntIdArray);
  }

  // pick interest Geners data
  function pickInterestGenersData(i) {
    console.log('selectedInterestGenersData', selectedInterestGenersData);

    console.log('index', i);
    let intGenersData = JSON.parse(JSON.stringify(interestGenersData));
    let intGenersDataIds = JSON.parse(
      JSON.stringify(selectedInterestGenersData),
    );
    console.log('Exp new  array=...', intGenersData, i);
    if (selectedInterestGenersData.length === 10) {
      if (intGenersData[i].selected) {
        intGenersData[i].selected = false;
        const index = intGenersDataIds.indexOf(intGenersData[i].id);
        if (index > -1) {
          intGenersDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (intGenersData[i].selected) {
        intGenersData[i].selected = false;
        const index = intGenersDataIds.indexOf(intGenersData[i].id);
        if (index > -1) {
          intGenersDataIds.splice(index, 1);
        }
      } else {
        intGenersData[i].selected = true;
        if (intGenersDataIds.indexOf(intGenersData[i].id) < 0) {
          intGenersDataIds.push(intGenersData[i].id);
          selectedIntIdArray.push(intGenersData[i].id);
          setSelectedIntIdArray[selectedIntIdArray];
        }
      }
    }

    console.log('intGenersIds', intGenersDataIds);
    setInterestGenersData(intGenersData);
    setSelectedGenersData(intGenersDataIds);

    console.log('selectedIntIds', selectedIntIdArray);
  }

  // pick interest Software data
  function pickInterestSoftwareData(i) {
    console.log('selectedInterestSoftwareData', selectedInterestSoftwareData);

    console.log('index', i);
    let intSoftwareData = JSON.parse(JSON.stringify(interestSoftwareData));
    let intSoftwareDataIds = JSON.parse(
      JSON.stringify(selectedInterestSoftwareData),
    );
    console.log('Exp new  array=...', intSoftwareData, i);
    if (selectedInterestSoftwareData.length === 10) {
      if (intSoftwareData[i].selected) {
        intSoftwareData[i].selected = false;
        const index = intSoftwareDataIds.indexOf(intSoftwareData[i].id);
        if (index > -1) {
          intSoftwareDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (intSoftwareData[i].selected) {
        intSoftwareData[i].selected = false;
        const index = intSoftwareDataIds.indexOf(intSoftwareData[i].id);
        if (index > -1) {
          intSoftwareDataIds.splice(index, 1);
        }
      } else {
        intSoftwareData[i].selected = true;
        if (intSoftwareDataIds.indexOf(intSoftwareData[i].id) < 0) {
          intSoftwareDataIds.push(intSoftwareData[i].id);
          selectedIntIdArray.push(intSoftwareData[i].id);
          setSelectedIntIdArray[selectedIntIdArray];
        }
      }
    }
    console.log('intSoftwareIds', intSoftwareDataIds);
    setInterestSoftwareData(intSoftwareData);
    setSelectedInterestSoftwareData(intSoftwareDataIds);

    console.log('selectedIntIds', selectedIntIdArray);
  }

  // pick people  data
  function pickPeopleData(i) {
    console.log('selectedPeopleData', selectedPeopleData);

    console.log('index', i);
    let peopData = JSON.parse(JSON.stringify(peopleData));
    let peopDataIds = JSON.parse(JSON.stringify(selectedPeopleData));
    console.log('Exp new  array=...', peopData, i);
    if (peopData[i].selected) {
      peopData[i].selected = false;
      const index = peopDataIds.indexOf(peopData[i].id);
      if (index > -1) {
        peopDataIds.splice(index, 1);
      }
    } else {
      peopData[i].selected = true;
      if (peopDataIds.indexOf(peopData[i].id) < 0) {
        peopDataIds.push(peopData[i].id);
        selectedPeoIdArray.push(peopData[i].id);
        setSelectedPeoIdArray[selectedPeoIdArray];
      }
    }

    console.log('intSoftwareIds', peopDataIds);
    setPeopleData(peopData);
    setSelectedPeopleData(peopDataIds);

    console.log('selectedPeoIds', selectedPeoIdArray);
  }

  // pick communities data
  function pickCommunitiesData(i) {
    console.log('selectedCommunitiesData', selectedCommunitiesData);

    console.log('index', i);
    let commData = JSON.parse(JSON.stringify(communitiesData));
    let commDataIds = JSON.parse(JSON.stringify(selectedCommunitiesData));
    console.log('Exp new  array=...', commData, i);
    if (commData[i].selected) {
      commData[i].selected = false;
      const index = commDataIds.indexOf(commData[i].id);
      if (index > -1) {
        commDataIds.splice(index, 1);
      }
    } else {
      commData[i].selected = true;
      if (commDataIds.indexOf(commData[i].id) < 0) {
        commDataIds.push(commData[i].id);
        selectedPeoIdArray.push(commData[i].id);
        setSelectedPeoIdArray[selectedPeoIdArray];
      }
    }

    console.log('intSoftwareIds', commDataIds);
    setCommunityData(commData);
    setSelectedCommunitiesData(commDataIds);

    console.log('selectedPeoIds', selectedPeoIdArray);
  }

  // pick expertise software
  function pickExpertiseSoftware(i) {
    console.log('selectedCommunitiesData', selectedExpertiseSoftware);

    console.log('index', i);
    let expertiseSoftwareData = JSON.parse(JSON.stringify(expertiseSoftware));
    let expertiseSoftwareDataIds = JSON.parse(
      JSON.stringify(selectedExpertiseSoftware),
    );
    console.log('Exp new  array=...', expertiseSoftwareData, i);

    if (selectedExpertiseSoftware.length === 10) {
      if (expertiseSoftwareData[i].selected) {
        expertiseSoftwareData[i].selected = false;
        const index = expertiseSoftwareDataIds.indexOf(
          expertiseSoftwareData[i].id,
        );
        if (index > -1) {
          expertiseSoftwareDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (expertiseSoftwareData[i].selected) {
        expertiseSoftwareData[i].selected = false;
        const index = expertiseSoftwareDataIds.indexOf(
          expertiseSoftwareData[i].id,
        );
        if (index > -1) {
          expertiseSoftwareDataIds.splice(index, 1);
        }
      } else {
        expertiseSoftwareData[i].selected = true;
        if (expertiseSoftwareDataIds.indexOf(expertiseSoftwareData[i].id) < 0) {
          expertiseSoftwareDataIds.push(expertiseSoftwareData[i].id);
          selectedExpertiseIdArray.push(expertiseSoftwareData[i].id);
          setSelectedExpertiseIdArray[selectedPeoIdArray];
        }
      }
    }

    console.log('intSoftwareIds', expertiseSoftwareDataIds);
    setExpertiseSoftware(expertiseSoftwareData);
    setSelectedExpertiseSoftware(expertiseSoftwareDataIds);

    console.log('selectedExpertiseIds', selectedExpertiseIdArray);
  }

  // pick expertise instruments
  function pickExpertiseInstruments(i) {
    console.log(
      'selectedExpertiseInstrumentsData',
      selectedExpertiseInstruments,
    );

    console.log('index', i);
    let expertiseInstrumentsData = JSON.parse(
      JSON.stringify(expertiseInstruments),
    );
    let expertiseInstrumentsDataIds = JSON.parse(
      JSON.stringify(selectedExpertiseInstruments),
    );
    console.log('Exp new  array=...', expertiseInstrumentsData, i);
    if (selectedExpertiseInstruments.length === 10) {
      if (expertiseInstrumentsData[i].selected) {
        expertiseInstrumentsData[i].selected = false;
        const index = expertiseInstrumentsDataIds.indexOf(
          expertiseInstrumentsData[i].id,
        );
        if (index > -1) {
          expertiseInstrumentsDataIds.splice(index, 1);
        }
      } else {
        Alert.alert('You can pick only ten experience');
      }
    } else {
      if (expertiseInstrumentsData[i].selected) {
        expertiseInstrumentsData[i].selected = false;
        const index = expertiseInstrumentsDataIds.indexOf(
          expertiseInstrumentsData[i].id,
        );
        if (index > -1) {
          expertiseInstrumentsDataIds.splice(index, 1);
        }
      } else {
        expertiseInstrumentsData[i].selected = true;
        if (
          expertiseInstrumentsDataIds.indexOf(expertiseInstrumentsData[i].id) <
          0
        ) {
          expertiseInstrumentsDataIds.push(expertiseInstrumentsData[i].id);
          selectedExpertiseIdArray.push(expertiseInstrumentsData[i].id);
          setSelectedExpertiseIdArray[selectedPeoIdArray];
        }
      }
    }
    console.log('intSoftwareIds', expertiseInstrumentsDataIds);
    setExpertiseInstruments(expertiseInstrumentsData);
    setSelectedExpertiseInstruments(expertiseInstrumentsDataIds);

    console.log('selectedExpertiseIds', selectedExpertiseIdArray);
  }

  const setLinkId = id => {
    linkData.map((item, index) => {
      if (index == id) {
        myProfessionDATA[index].selected = true;
      } else {
        myProfessionDATA[index].selected = false;
      }
    });
    myLinkId = id.id;
    myLinkId;
    setMyLinkId(myLinkId);
    console.log('Link id......', myLinkId);
  };

  const setSelectedIndex = name => {
    myProfessionDATA.map((item, index) => {
      if (index == name) {
        myProfessionDATA[index].selected = true;
      } else {
        myProfessionDATA[index].selected = false;
      }
    });
    professionName = name;
    professionName;
    console.log(professionName);
    setMyProf(professionName);
    this.RBProfessionSheet.close();
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        // We have data!!
        mToken = value;
        console.log('my user token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('picked image', image.path);
      setUri(image.path);
      props.onChange?.(image);
    });
  };

  const pickCoverImage = async () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 400,
      cropping: true,
    }).then(image => {
      setCoverUri(image.path);
      props.onChange?.(image);
      this.RBProfileOption.close();
      console.log('picked cover image', coverUri);
      addProfile();
    });
  };

  const getAdminCategories = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        mToken = value;
        //setToken(value)
        console.log('my userr  token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    fetch('https://stemy.io/backend/public/api/get_data', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + mToken,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.text())
      .then(result => {
        let jsonObject = JSON.parse(result);
        const eData = jsonObject.data.experience.IndustryExperience;
        const pData = jsonObject.data.experience.Platforms;
        const esData = jsonObject.data.experience.Software;
        const eiData = jsonObject.data.experience.Instruments;
        const intData = jsonObject.data.interest.Plugin;
        const intPlatData = jsonObject.data.interest.Platforms;
        const intGenersData = jsonObject.data.interest.Geners;
        const intSoftwareData = jsonObject.data.interest.Software;
        const peoData = jsonObject.data.people.People;
        const coData = jsonObject.data.people.Communities;
        const etsData = jsonObject.data.expertise.Software;
        const etiData = jsonObject.data.expertise.Instruments;

        let _selectedExperienceData = [];
        eData.forEach(l => {
          if (expIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectedExperienceData.push(l.id);
          }
        });

        let _selectedExperiencePlatformData = [];
        pData.forEach(l => {
          if (expPlatformIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectedExperiencePlatformData.push(l.id);
          }
        });

        let _selectedExperienceSoftwareData = [];
        esData.forEach(l => {
          if (expSoftwareIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectedExperienceSoftwareData.push(l.id);
          }
        });

        let _selectedExperienceInstrumentData = [];
        eiData.forEach(l => {
          if (expInstrumentsIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectedExperienceInstrumentData.push(l.id);
          }
        });

        let _selectInterestData = [];
        eData.forEach(l => {
          if (interestIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectInterestData.push(l.id);
          }
        });

        let _selectInterestPlatformData = [];
        intPlatData.forEach(l => {
          if (interestPlatformIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectInterestPlatformData.push(l.id);
          }
        });

        let _selectInterestGenersData = [];
        intGenersData.forEach(l => {
          if (interestGenersIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectInterestGenersData.push(l.id);
          }
        });

        let _selectInterestSoftwareData = [];
        intSoftwareData.forEach(l => {
          if (interestSoftwareIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectInterestSoftwareData.push(l.id);
          }
        });

        let _selectPeopleData = [];
        peoData.forEach(l => {
          if (peopleIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectPeopleData.push(l.id);
          }
        });

        let _selectCommData = [];
        coData.forEach(l => {
          if (communitiesIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectCommData.push(l.id);
          }
        });

        let _selectExpetiseSoftwareData = [];
        etsData.forEach(l => {
          if (expertiseSoftwareIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectExpetiseSoftwareData.push(l.id);
          }
        });

        let _selectExpetiseInstrumentsData = [];
        etsData.forEach(l => {
          if (expertiseInstrumentsIdTempArr.indexOf(l.id) > -1) {
            l.selected = true;
            _selectExpetiseInstrumentsData.push(l.id);
          }
        });

        console.log('Admin Data List', intSoftwareData);

        setExperienceData(eData);
        setSelectedExperienceData(_selectedExperienceData);
        setExperiencePlatformData(pData);
        setSelectedExperiencePlatformData(_selectedExperiencePlatformData);
        setExperienceSoftwareData(esData);
        setSelectedExperienceSoftwareData(_selectedExperienceSoftwareData);
        setExperienceInstrumentsData(eiData);
        setSelectedExperienceInstrumentsData(_selectedExperienceInstrumentData);
        setInterestData(intData);
        setSelectedInterestData(_selectInterestData);
        setInterestPlatformData(intPlatData);
        setSelectedInteretPlatformData(_selectInterestPlatformData);
        setInterestGenersData(intGenersData);
        setSelectedGenersData(_selectInterestGenersData);
        setInterestSoftwareData(intSoftwareData);
        setSelectedInterestSoftwareData(_selectInterestSoftwareData);
        setPeopleData(peoData);
        setSelectedPeopleData(_selectPeopleData);
        setCommunityData(coData);
        setSelectedCommunitiesData(_selectCommData);
        setExpertiseSoftware(etsData);
        setSelectedExpertiseSoftware(_selectExpetiseSoftwareData);
        setExpertiseInstruments(etiData);
        setSelectedExpertiseInstruments(_selectExpetiseInstrumentsData);

        //setPlatformData(jsonObject.data.experience.Platforms);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const getLinkList = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        mToken = value;
        //setToken(value)
        console.log('Get Link list token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    fetch('https://stemy.io/backend/public/api/links_list', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + mToken,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.text())
      .then(result => {
        let jsonObject = JSON.parse(result);
        setLinkData(jsonObject.links);
        console.log('Link lists.....', linkData);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const profileApi = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        mToken = value;
        //setToken(value)
        console.log('my userr  token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    fetch('https://stemy.io/backend/public/api/profile', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + mToken,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.text())
      .then(result => {
        setLoading(false);
        let jsonObject = JSON.parse(result);

        setUserId(jsonObject.data.id);
        setIsVerified(jsonObject.data.is_verified);
        setBio(jsonObject.data.bio);
        setName(jsonObject.data.name);
        setUsername(jsonObject.data.username);
        setUri(jsonObject.data.image);
        setCoverUri(jsonObject.data.cover_image);
        setMyProf(jsonObject.data.profession);
        setDOB(jsonObject.data.dob);
        setMyName(jsonObject.data.name);
        setMyProfession(jsonObject.data.profession);
        setMyProfileUrl(jsonObject.data.image);
        setProfileLink(jsonObject.data.links);

        console.log('Profile data', jsonObject.data);

        EventRegister.emit('profileImage', jsonObject.data.image);
        //console.log('Profile user id', userId);

        console.log('Profile Url', profileLink);

        try {
          AsyncStorage.setItem('myImage', jsonObject.data.image);
          console.log('image saved', jsonObject.data.image);
        } catch (error) {
          // Error saving data
        }

        //setPlatformData(jsonObject.data.experience.Platforms);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };

  const addProfile = async () => {
    this.RBSheetProfile.close();
    this.RBSheetOne.close();

    setLoading(true), console.log('loadinggg.... ', isLoading);

    const profileData = new FormData();
    profileData.append('name', enterName);
    profileData.append('profession', myProfession);
    profileData.append('username', username);
    profileData.append('dob', dob);
    profileData.append('bio', bio);

    profileData.append('image', {
      name: 'image.jpg',
      type: 'image/jpeg',
      uri: uri,
    });

    profileData.append('cover_image', {
      name: 'image.jpg',
      type: 'image/jpeg',
      uri: coverUri,
    });

    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        mToken = value;
        //setToken(value)
        console.log('my userr  token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + mToken,
      },
      body: profileData,
    };

    console.log('body data :' + JSON.stringify(requestOptions));
    try {
      await fetch(
        'https://stemy.io/backend/public/api/update_profile',
        requestOptions,
      )
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            console.log('response data', response.message);
            profileApi();
            setLoading(false);
          } else {
            setLoading(false);
            Alert.alert(response.message);
            console.log(response.message);
          }
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const addUserLink = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        mToken = value;
        console.log('my user token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    if (addLink === '') {
      Alert.alert('Please enter link');
    } else {
      console.log('tokennn.... ', mToken);
      this.RBSheetLink.close();
      this.RBSheetAddLink.close();
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + mToken,
          'Content-Type': 'application/json',
        }),

        body: JSON.stringify({
          link_ids: linkId,
          link_urls: addLink,
        }),
      };

      console.log('body data :' + JSON.stringify(requestOptions));
      try {
        await fetch(
          'https://stemy.io/backend/public/api/add_links',
          requestOptions,
        )
          .then(response => response.json())
          .then(response => {
            if (response.status === true) {
              setLoading(false);
              profileApi();
              Alert.alert(response.message);
              console.log('Help response....:' + response.message);
            } else {
              setLoading(false);
              Alert.alert(response.message);
              console.log(response.message);
            }
          });
      } catch (error) {
        setLoading(false);
        console.error('Error', error);
      }
    }
  };

  const addExperience = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        mToken = value;
        console.log('my user token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    console.log('tokennn.... ', mToken);

    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + mToken,
        'Content-Type': 'application/json',
      }),

      body: JSON.stringify({
        experience_ids: selectedExpIdArray,
        interest_ids: selectedIntIdArray,
        people_ids: selectedPeoIdArray,
        expertise_ids: selectedExpIdArray,
      }),
    };

    console.log('body data :' + JSON.stringify(requestOptions));
    try {
      await fetch(
        'https://stemy.io/backend/public/api/add_user_data',
        requestOptions,
      )
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            setLoading(false);

            profileApi();
            Alert.alert(response.message);
            console.log('Help response....:' + response.message);
          } else {
            setLoading(false);
            Alert.alert(response.message);
            console.log(response.message);
          }
        });
    } catch (error) {
      setLoading(false);
      console.error('Error', error);
    }
  };

  return (
    <SafeAreaView
      style={{backgroundColor: '#fafafa', flex: 1, flexDirection: 'column'}}>
      <View style={{backgroundColor: 'white', height: 60}}>
        <Text style={styles.barText}>Profile</Text>
      </View>

      <KeyboardAwareScrollView bounces={false}>
        <View style={{height: '100%'}}>
          <View>
            <Image
              style={{width: '100%', height: 100, resizeMode: 'cover'}}
              source={
                coverUri != undefined
                  ? {uri: coverUri}
                  : require('../Utilities/Images/profile_cover.png')
              }
            />

            <TouchableOpacity
              style={{
                width: 50,
                height: 30,
                resizeMode: 'cover',
                position: 'absolute',
                alignSelf: 'flex-end',
                margin: 10,
              }}
              onPress={() => this.RBProfileOption.open()}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'cover',
                  padding: 15,
                }}
                source={require('../Utilities/Images/three_dot.png')}
              />
            </TouchableOpacity>

            <Image
              style={{
                alignSelf: 'center',
                marginTop: -45,
                width: 100,
                height: 100,
                resizeMode: 'cover',
                borderRadius: 100,
              }}
              source={
                profileUrl != null
                  ? {uri: profileUrl}
                  : require('../Utilities/Images/man.png')
              }
              //source={require('../Utilities/Images/man.png')}
            />

            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: -30, marginLeft: 70}}
              onPress={() => {
                this.RBSheetProfile.open();
              }}>
              <Image
                style={{width: 26, height: 26, resizeMode: 'cover'}}
                source={require('../Utilities/Images/edit_camera.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              width: '90%',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                fontFamily: 'Viga-Regular',
              }}>
              {myName == null ? 'Username' : myName}
            </Text>

            {isVerified !== 0 ? (
              <Image
                style={{
                  marginLeft: 10,
                  alignSelf: 'center',
                  width: 22,
                  height: 22,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/seal_check.png')}
              />
            ) : null}
          </View>

          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 16,
              marginTop: 5,
              fontFamily: 'SF Pro Display Regular',
            }}>
            {myProfessionProfile == null
              ? 'Profession Name'
              : myProfessionProfile}
          </Text>

          <View style={{flexDirection: 'row'}}></View>

          {/* followers layout view */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 15,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: 'black', alignSelf: 'center', fontSize: 16}}>
                0
              </Text>

              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 16,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                followers
              </Text>
            </View>

            <View style={{flexDirection: 'column', marginHorizontal: 20}}>
              <Text style={{color: 'black', alignSelf: 'center', fontSize: 16}}>
                0
              </Text>

              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 16,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                following
              </Text>
            </View>

            <View style={{flexDirection: 'column'}}>
              <Image
                style={{
                  marginLeft: 10,
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/link_pin.png')}
              />

              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 16,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                share profile
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: 'white',
              elevation: 1,
              borderRadius: 8,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                marginStart: 10,
                color: 'black',
                fontSize: 16,
                fontFamily: 'Viga-Regular',
              }}>
              Bio
            </Text>

            {bio == null ? (
              ''
            ) : (
              <Text
                style={{
                  marginStart: 10,
                  marginVertical: 5,
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                {bio}
              </Text>
            )}

            <Text
              style={{
                color: '#177E89',
                fontSize: 15,
                marginTop: 10,
                marginStart: 10,
                textDecorationLine: 'underline',
                fontFamily: 'SF Pro Display Regular',
              }}
              // onPress={() => this.RBSheetOne.open()}
              onPress={() => this.RBSheetOne.open()}>
              Add bio
            </Text>
          </View>

          <View
            style={{
              marginTop: 15,
              backgroundColor: 'white',
              elevation: 1,
              marginHorizontal: 20,
              borderRadius: 8,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                marginStart: 10,
                color: 'black',
                fontSize: 16,
                fontFamily: 'Viga-Regular',
              }}>
              Links
            </Text>

            {/* Links layout view */}
            <View
              style={{flexDirection: 'row', marginTop: 15, marginStart: 10}}>
              <FlatList
                bounces={false}
                style={{flexGrow: 0}}
                data={profileLink}
                numColumns={4}
                renderItem={list => ItemLinkImage(list.item, list.index)}
                keyExtractor={item => item}
              />

              <TouchableOpacity onPress={() => this.RBSheetLink.open()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    marginStart: 20,
                    textDecorationLine: 'underline',
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  +add more
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 15,
              marginHorizontal: 20,
              backgroundColor: 'white',
              elevation: 1,
              borderRadius: 8,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                marginStart: 10,
                color: 'black',
                fontSize: 16,
                fontFamily: 'Viga-Regular',
              }}>
              Experience
            </Text>

            <Text
              style={{
                color: '#177E89',
                fontSize: 15,
                marginTop: 10,
                marginStart: 10,
                textDecorationLine: 'underline',
                fontFamily: 'SF Pro Display Regular',
              }}
              onPress={() => this.RBSheetExperience.open()}>
              Add years of experience
            </Text>

            <Text
              style={{
                color: '#177E89',
                fontSize: 15,
                marginTop: 10,
                marginStart: 10,
                textDecorationLine: 'underline',
                fontFamily: 'SF Pro Display Regular',
              }}
              onPress={() => this.RBSheetExpertise.open()}>
              Add area of expertise
            </Text>
          </View>

          <View
            style={{
              marginTop: 15,
              marginHorizontal: 20,
              backgroundColor: 'white',
              elevation: 1,
              borderRadius: 8,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                marginStart: 10,
                color: 'black',
                fontSize: 16,
                fontFamily: 'Viga-Regular',
              }}>
              Interests & topics
            </Text>

            <Text
              style={{
                color: '#177E89',
                fontSize: 15,
                marginTop: 10,
                marginStart: 10,
                textDecorationLine: 'underline',
                fontFamily: 'SF Pro Display Regular',
              }}
              onPress={() => this.RBSheetInterest.open()}>
              Add Interests
            </Text>
          </View>

          <View
            style={{
              marginTop: 15,
              marginHorizontal: 20,
              backgroundColor: 'white',
              elevation: 1,
              borderRadius: 8,
              paddingVertical: 15,
              marginVertical: 15,
            }}>
            <Text
              style={{
                marginStart: 10,
                color: 'black',
                fontSize: 16,
                fontFamily: 'Viga-Regular',
              }}>
              People & communications
            </Text>

            <Text
              style={{
                color: '#177E89',
                fontSize: 15,
                marginTop: 10,
                marginStart: 10,
                textDecorationLine: 'underline',
                fontFamily: 'SF Pro Display Regular',
              }}
              onPress={() => this.RBSheetPeople.open()}>
              Add people
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Bio bottom sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetOne = ref;
        }}
        height={450}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            alignItems: 'center',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontFamily: 'Viga-Regular',
          }}>
          Bio
        </Text>

        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Enter bio"
          placeholderTextColor={(color = 'gray')}
          underlineColorAndroid="transparent"
          value={bio}
          onChangeText={value => setBio(value)}
        />

        <Text
          style={{
            color: 'black',
            fontSize: 14,
            alignSelf: 'flex-end',
            marginEnd: 20,
            fontFamily: 'SF Pro Display Regular',
          }}>
          0/500
        </Text>

        <TouchableOpacity
          style={{
            height: 46,
            width: '90%',
            marginTop: 100,
            color: 'white',
            backgroundColor: '#DBAA4A',
            marginHorizontal: 18,
            justifyContent: 'center',
            borderRadius: 25,
            marginTop: 30,
            marginBottom: 20,
          }}
          onPress={() => addProfile()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              borderRadius: 50,
              paddingVertical: 12,
              fontFamily: 'Viga-Regular',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </RBSheet>

      {/* Experience sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetExperience = ref;
        }}
        height={700}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                fontFamily: 'Viga-Regular',
              }}>
              Experience
            </Text>

            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  marginStart: 10,
                  marginTop: 15,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Industry experience
              </Text>

              {expShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  //ListHeaderComponent={() => <Text>{selectedExperienceData}</Text>}
                  style={{
                    flexGrow: 0,
                    marginTop: 10,
                  }}
                  data={experienceData.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExp item={listItem.item} index={listItem.index} />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  //ListHeaderComponent={() => <Text>{selectedExperienceData}</Text>}
                  style={{
                    flexGrow: 0,
                    marginTop: 10,
                  }}
                  data={experienceData}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExp item={listItem.item} index={listItem.index} />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}

              <Text
                style={{
                  marginTop: 20,
                  marginStart: 10,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Platforms
              </Text>

              {expPlatformShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experiencePlatforms.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpPlatform
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expPlatformShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experiencePlatforms}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpPlatform
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expPlatformShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpPlatMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expPlatformShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpPlatLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}

              <Text
                style={{
                  marginTop: 20,
                  marginStart: 10,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Software
              </Text>

              {expSoftShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experienceSoftwareData.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpSoftware
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expSoftShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experienceSoftwareData}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpSoftware
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expSoftShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpSoftMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expSoftShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpSoftLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}

              <Text
                style={{
                  marginTop: 20,
                  marginStart: 10,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Instruments
              </Text>

              {expInstShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experienceInstrumentsData.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpInstruments
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expInstShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experienceInstrumentsData}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpInstruments
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expInstShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpInstMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expInstShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpInstLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>

            {/* <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  marginStart: 10,
                  marginTop: 15,
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Beginner
              </Text>

              {expShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  //ListHeaderComponent={() => <Text>{selectedExperienceData}</Text>}
                  style={{
                    flexGrow: 0,
                    marginTop: 10,
                  }}
                  data={experienceData.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExp item={listItem.item} index={listItem.index} />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  //ListHeaderComponent={() => <Text>{selectedExperienceData}</Text>}
                  style={{
                    flexGrow: 0,
                    marginTop: 10,
                  }}
                  data={experienceData}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExp item={listItem.item} index={listItem.index} />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}

              <Text
                style={{
                  marginTop: 20,
                  marginStart: 10,
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Intermediate
              </Text>

              {expPlatformShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experiencePlatforms.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpPlatform
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expPlatformShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experiencePlatforms}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpPlatform
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expPlatformShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpPlatMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expPlatformShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpPlatLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}

              <Text
                style={{
                  marginTop: 20,
                  marginStart: 10,
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Expert
              </Text>

              {expSoftShowMore !== '' ? (
                ''
              ) : (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experienceSoftwareData.slice(0, 4)}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpSoftware
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              )}

              {expSoftShowMore === 1 ? (
                <FlatList
                  bounces={false}
                  style={{flexGrow: 0, marginTop: 10}}
                  data={experienceSoftwareData}
                  numColumns={4}
                  renderItem={listItem =>
                    listItem && listItem.item ? (
                      <ItemExpSoftware
                        item={listItem.item}
                        index={listItem.index}
                      />
                    ) : (
                      <View></View>
                    )
                  }
                  //renderItem={list => ItemExp(list.name, list.index)}
                  keyExtractor={item => item.name}
                />
              ) : (
                ''
              )}

              {expSoftShowMore !== '' ? (
                ''
              ) : (
                <TouchableOpacity onPress={() => showExpSoftMore()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    Show more
                  </Text>
                </TouchableOpacity>
              )}

              {expSoftShowMore === 1 ? (
                <TouchableOpacity onPress={() => showExpSoftLess()}>
                  <Text
                    style={{
                      color: '#177E89',
                      fontSize: 16,
                      textDecorationLine: 'underline',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    Show less
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View> */}

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 100,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
                marginTop: 30,
                marginBottom: 20,
              }}
              onPress={() => {
                {
                  this.RBSheetExperience.close();
                  addExperience();
                }
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  backgroundColor: '#DBAA4A',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                  fontFamily: 'Viga-Regular',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* Expertise sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetExpertise = ref;
        }}
        height={700}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                fontFamily: 'Viga-Regular',
              }}>
              Expertise
            </Text>

            <Text
              style={{
                marginTop: 20,
                marginStart: 10,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Software
            </Text>

            {expertiseSoftShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                bounces={false}
                style={{flexGrow: 0, marginTop: 10}}
                data={expertiseSoftware.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemExpertiseSoftware
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            )}

            {expertiseSoftShowMore === 1 ? (
              <FlatList
                bounces={false}
                style={{flexGrow: 0, marginTop: 10}}
                data={expertiseSoftware}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemExpertiseSoftware
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {expertiseSoftShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showExpertiseSoftMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {expertiseSoftShowMore === 1 ? (
              <TouchableOpacity onPress={() => showExpertiseSoftLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <Text
              style={{
                marginTop: 20,
                marginStart: 10,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Instruments
            </Text>

            {expertiseInstShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                bounces={false}
                style={{flexGrow: 0, marginTop: 10}}
                data={expertiseInstruments.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemExpertiseInstruments
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            )}

            {expertiseInstShowMore === 1 ? (
              <FlatList
                bounces={false}
                style={{flexGrow: 0, marginTop: 10}}
                data={expertiseInstruments}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemExpertiseInstruments
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {expertiseInstShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showExpertiseInstMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {expertiseInstShowMore === 1 ? (
              <TouchableOpacity onPress={() => showExpertiseInstLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 100,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
                marginTop: 30,
                marginBottom: 20,
              }}
              onPress={() => {
                this.RBSheetExpertise.close(), addExperience();
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  backgroundColor: '#DBAA4A',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                  fontFamily: 'Viga-Regular',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* Intersets topics sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetInterest = ref;
        }}
        height={700}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <ScrollView>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                fontFamily: 'Viga-Regular',
              }}>
              Interests & topics
            </Text>

            <Text
              style={{
                marginStart: 20,
                marginTop: 15,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Plugin
            </Text>

            {intPluginShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={interestData.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestPlugin
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            )}

            {intPluginShowMore === 1 ? (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={interestData}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestPlugin
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {intPluginShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showIntPluginMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {intPluginShowMore === 1 ? (
              <TouchableOpacity onPress={() => showIntPluginLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <Text
              style={{
                marginTop: 20,
                marginStart: 20,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Platforms
            </Text>

            {intPlatformShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                style={{
                  flexGrow: 0,
                  marginHorizontal: 10,
                  marginTop: 10,
                }}
                data={interestPlatformData.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestPlatform
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            )}

            {intPlatformShowMore === 1 ? (
              <FlatList
                style={{
                  flexGrow: 0,
                  marginHorizontal: 10,
                  marginTop: 10,
                }}
                data={interestPlatformData}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestPlatform
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {intPlatformShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showIntPlatMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {intPlatformShowMore === 1 ? (
              <TouchableOpacity onPress={() => showIntPlatLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <Text
              style={{
                marginTop: 20,
                marginStart: 20,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Geners
            </Text>

            {intGenersShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={interestGenersData.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestGeners
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            )}

            {intGenersShowMore === 1 ? (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={interestGenersData}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestGeners
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {intGenersShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showIntGenersMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {intGenersShowMore === 1 ? (
              <TouchableOpacity onPress={() => showIntGenersLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <Text
              style={{
                marginTop: 20,
                marginStart: 20,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Softwares
            </Text>

            {intSoftwareShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={interestSoftwareData.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestSoftwares
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            )}

            {intSoftwareShowMore === 1 ? (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={interestSoftwareData}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemInrestSoftwares
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {intSoftwareShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showIntSoftMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {intSoftwareShowMore === 1 ? (
              <TouchableOpacity onPress={() => showIntSoftLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 100,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
                marginTop: 30,
                marginBottom: 20,
              }}
              onPress={() => {
                this.RBSheetInterest.close(), addExperience();
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Viga-Regular',
                  backgroundColor: '#DBAA4A',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </RBSheet>

      {/* People and communications sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetPeople = ref;
        }}
        height={700}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                fontFamily: 'Viga-Regular',
              }}>
              People & communities
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                width: '90%',
                color: 'black',
                paddingHorizontal: 20,
                fontSize: 16,
                backgroundColor: '#efefef',
                alignSelf: 'center',
                borderRadius: 50,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/search_icon.jpeg')}
              />

              <TextInput
                style={{
                  width: '90%',
                  color: 'black',
                  height: 45,
                  paddingHorizontal: 20,
                  fontSize: 16,
                  backgroundColor: '#efefef',
                  fontFamily: 'SF Pro Display Regular',
                }}
                placeholder="Search profession"
                placeholderTextColor="#606060"></TextInput>
            </View>

            <Text
              style={{
                marginStart: 20,
                marginTop: 15,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              People
            </Text>

            {peoShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={peopleData.slice(0, 4)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemPeople item={listItem.item} index={listItem.index} />
                  ) : (
                    <View></View>
                  )
                }
                //renderItem={list => ItemExp(list.name, list.index)}
                keyExtractor={item => item.name}
              />
            )}

            {peoShowMore === 1 ? (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={peopleData}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemPeople item={listItem.item} index={listItem.index} />
                  ) : (
                    <View></View>
                  )
                }
                //renderItem={list => ItemExp(list.name, list.index)}
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {peoShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showPeoMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {peoShowMore === 1 ? (
              <TouchableOpacity onPress={() => showPeoLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <Text
              style={{
                marginTop: 20,
                marginStart: 20,
                color: 'black',
                fontSize: 15,
                fontFamily: 'Viga-Regular',
              }}>
              Communities
            </Text>

            {commShowMore !== '' ? (
              ''
            ) : (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={communitiesData.slice(0, 1)}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemCommunities
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                //renderItem={list => ItemExp(list.name, list.index)}
                keyExtractor={item => item.name}
              />
            )}

            {commShowMore === 1 ? (
              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={communitiesData}
                numColumns={4}
                renderItem={listItem =>
                  listItem && listItem.item ? (
                    <ItemCommunities
                      item={listItem.item}
                      index={listItem.index}
                    />
                  ) : (
                    <View></View>
                  )
                }
                //renderItem={list => ItemExp(list.name, list.index)}
                keyExtractor={item => item.name}
              />
            ) : (
              ''
            )}

            {commShowMore !== '' ? (
              ''
            ) : (
              <TouchableOpacity onPress={() => showCommMore()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Show more
                </Text>
              </TouchableOpacity>
            )}

            {commShowMore === 1 ? (
              <TouchableOpacity onPress={() => showCommLess()}>
                <Text
                  style={{
                    color: '#177E89',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  Show less
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 100,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
                marginTop: 30,
              }}
              onPress={() => {
                this.RBSheetPeople.close(), addExperience();
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                  fontFamily: 'Viga-Regular',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* Link List sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetLink = ref;
        }}
        height={700}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.RBSheetLink.close()}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: 'black',
                    marginStart: 10,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  width: '80%',
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Viga-Regular',
                }}>
                Links
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                width: '90%',
                color: 'black',
                paddingHorizontal: 20,
                fontSize: 16,
                backgroundColor: '#efefef',
                alignSelf: 'center',
                borderRadius: 50,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/search_icon.jpeg')}
              />

              <TextInput
                style={{
                  width: '90%',
                  color: 'black',
                  height: 40,
                  paddingHorizontal: 20,
                  fontSize: 16,
                  backgroundColor: '#efefef',
                  fontFamily: 'SF Pro Display Regular',
                }}
                placeholder="Search profession"
                placeholderTextColor="#606060"></TextInput>
            </View>

            <FlatList
              bounces={false}
              style={{
                marginTop: 10,
              }}
              data={linkData}
              renderItem={listItem =>
                listItem && listItem.item ? (
                  <ItemLink item={listItem.item} index={listItem.index} />
                ) : (
                  <View></View>
                )
              }
              keyExtractor={item => item.id}
            />

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 100,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
                marginTop: 30,
                fontFamily: 'Viga-Regular',
              }}
              onPress={() => this.RBSheetLink.close()}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <RBSheet
          ref={ref => {
            this.RBSheetAddLink = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: 'white',
              borderTopStartRadius: 18,
              borderTopEndRadius: 18,
              paddingVertical: 20,
            },
          }}>
          <View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  marginTop: 6,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Add Link
              </Text>

              <TextInput
                style={styles.inputAddLink}
                placeholder="https://"
                placeholderTextColor="#9B9B9B"
                onChangeText={value => setAddLink(value)}></TextInput>

              <TouchableOpacity
                style={{
                  height: 46,
                  marginTop: 15,
                  color: 'white',
                  backgroundColor: '#DBAA4A',
                  marginHorizontal: 18,
                  justifyContent: 'center',
                  borderRadius: 25,
                }}
                onPress={() => addUserLink()}>
                <Text
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '500',
                    borderRadius: 50,
                    width: '90%',
                    paddingVertical: 12,
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </RBSheet>

      {/* Profile sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetProfile = ref;
        }}
        height={700}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <ScrollView bounces={false}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  marginTop: 8,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Viga-Regular',
                }}>
                Profile
              </Text>

              <TouchableOpacity onPress={() => pickImage()}>
                <Image
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    width: 90,
                    height: 90,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                  // source={require('../Utilities/Images/man.png')}
                  {...props}
                  source={uri ? {uri} : require('../Utilities/Images/man.png')}
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 20,
                  marginStart: 20,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Name
              </Text>

              <TextInput
                style={{
                  marginTop: 15,
                  height: 45,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 50,
                  color: 'black',
                  paddingHorizontal: 20,
                  fontSize: 16,
                  borderWidth: 0.5,
                  borderColor: '#606060',
                  fontFamily: 'SF Pro Display Regular',
                }}
                placeholder="Enter your name"
                placeholderTextColor="#606060"
                value={enterName}
                onChangeText={value => setName(value)}></TextInput>

              <Text
                style={{
                  marginTop: 15,
                  marginStart: 20,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Username
              </Text>

              <TextInput
                style={{
                  marginTop: 15,
                  height: 45,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 50,
                  color: 'black',
                  paddingHorizontal: 20,
                  fontSize: 16,
                  borderWidth: 0.5,
                  borderColor: '#606060',
                  fontFamily: 'SF Pro Display Regular',
                }}
                placeholder="Enter your username"
                placeholderTextColor="#606060"
                value={username}
                onChangeText={value => setUsername(value)}></TextInput>

              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                  marginHorizontal: 20,
                  marginTop: 10,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                This is the name that will appear on your profile
              </Text>

              <Text
                style={{
                  marginTop: 15,
                  marginStart: 20,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Profession
              </Text>

              <TouchableOpacity onPress={() => this.RBProfessionSheet.open()}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 50,
                    borderWidth: 0.5,
                    marginTop: 15,
                    width: '90%',
                    alignSelf: 'center',
                    borderColor: '#606060',
                  }}>
                  <Text
                    style={{
                      borderRadius: 50,
                      color: 'black',
                      paddingHorizontal: 20,
                      paddingVertical: 14,
                      fontSize: 16,
                      width: '85%',
                      fontFamily: 'SF Pro Display Regular',
                    }}
                    placeholderTextColor="#606060">
                    {myProfession == '' ? 'Select Profession' : myProfession}
                  </Text>

                  <Image
                    style={{
                      alignSelf: 'center',
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                      alignContent: 'center',
                    }}
                    source={require('../Utilities/Images/dropdown_icon.jpeg')}
                  />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 15,
                  marginStart: 20,
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Date of birth
              </Text>

              <TouchableOpacity onPress={() => setDatePicker(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 50,
                    borderWidth: 0.5,
                    marginTop: 15,
                    width: '90%',
                    alignSelf: 'center',
                    borderColor: '#606060',
                  }}>
                  <Text
                    style={{
                      borderRadius: 50,
                      color: 'black',
                      paddingHorizontal: 20,
                      paddingVertical: 14,
                      fontSize: 16,
                      width: '85%',
                      fontFamily: 'SF Pro Display Regular',
                    }}
                    placeholderTextColor="#606060">
                    {dob === '' ? 'Select date of birth' : dob}
                  </Text>

                  <Image
                    style={{
                      alignSelf: 'center',
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                      alignContent: 'center',
                    }}
                    source={require('../Utilities/Images/calender.png')}
                  />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                  marginHorizontal: 20,
                  marginTop: 10,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                This will not be shown on your profile
              </Text>

              <TouchableOpacity
                style={{
                  height: 46,
                  marginTop: 15,
                  color: 'white',
                  backgroundColor: '#DBAA4A',
                  marginHorizontal: 18,
                  justifyContent: 'center',
                  borderRadius: 25,
                }}
                onPress={() => addProfile()}>
                <Text
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '500',
                    borderRadius: 50,
                    width: '90%',
                    paddingVertical: 12,
                    fontFamily: 'Viga-Regular',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Profession sheet */}
        <RBSheet
          ref={ref => {
            this.RBProfessionSheet = ref;
          }}
          height={700}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: 'white',
              borderTopStartRadius: 18,
              borderTopEndRadius: 18,
              paddingVertical: 20,
            },
          }}>
          <View>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.RBProfessionSheet.close()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'black',
                      fontWeight: '400',
                      marginStart: 20,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    width: '72%',
                    textAlign: 'center',
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '400',
                    marginEnd: 20,
                  }}>
                  Profession
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  width: '90%',
                  color: 'black',
                  paddingHorizontal: 20,
                  fontSize: 16,
                  backgroundColor: '#efefef',
                  alignSelf: 'center',
                  borderRadius: 50,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/search_icon.jpeg')}
                />

                <TextInput
                  style={{
                    width: '90%',
                    color: 'black',
                    height: 45,
                    paddingHorizontal: 20,
                    fontSize: 16,
                    backgroundColor: '#efefef',
                  }}
                  placeholder="Search profession"
                  placeholderTextColor="#606060"></TextInput>
              </View>

              <FlatList
                style={{flexGrow: 0, marginStart: 10, marginTop: 10}}
                data={myProfessionDATA}
                //renderItem={({item}) => <Item2 title={item.title} />}
                renderItem={list => Item2(list.item, list.index)}
                keyExtractor={item => item.name}
              />
            </View>
          </View>
        </RBSheet>
      </RBSheet>

      {/* Profile option */}
      <RBSheet
        ref={ref => {
          this.RBProfileOption = ref;
        }}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 18,
                  color: 'black',
                  fontWeight: '400',
                  marginEnd: 20,
                  fontFamily: 'Viga-Regular',
                }}>
                Profile Option
              </Text>
            </View>

            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity onPress={() => pickCoverImage()}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                      alignContent: 'center',
                    }}
                    source={require('../Utilities/Images/icon_camera.png')}
                  />

                  <Text
                    style={{
                      fontSize: 14,
                      alignSelf: 'center',
                      marginStart: 5,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Upload header image
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/preview.png')}
                />

                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    marginStart: 5,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Preview profile
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/link.png')}
                />

                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    marginStart: 5,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Share profile
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/chartline.png')}
                />

                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    marginStart: 5,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Your stats
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.RBProfileOption.close();
                  console.log('id....', userId);
                  navigation.navigate('Setting', {id: userId});
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                      alignContent: 'center',
                    }}
                    source={require('../Utilities/Images/gear.png')}
                  />

                  <Text
                    style={{
                      fontSize: 14,
                      alignSelf: 'center',
                      marginStart: 5,
                      fontFamily: 'SF Pro Display Regular',
                    }}>
                    Settings
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>

      <Loadingcomponent isVisible={isLoading} />

      {showDatePicker && (
        <DateTimePicker
          showDatePicker={showDatePicker}
          onConfirm={date => {
            let _date = Moment(date).format('DD-MM-YYYY');
            setDOB(_date);
            setDatePicker(false);
          }}
          onCancel={() => {
            setDatePicker(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default Profile;
