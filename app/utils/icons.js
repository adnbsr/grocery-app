import Ionicons from 'react-native-vector-icons/Ionicons'
import Evilicons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const icons = {
    "settings": [Evilicons, 'gear', 32, '#FFFFFF'],
    "plus": [Ionicons, 'md-add', 32, '#FFFFFF'],
    "camera": [Evilicons, 'camera', 32, '#FFFFFF'],
    'cart': [Evilicons, 'cart', 32, '#FFFFFF'],
    'add_to_cart': [MaterialIcons, 'add-shopping-cart', 32, '#000000'],
    'add': [MaterialIcons, 'add', 32, '#FFFFFF'],
    'menu': [MaterialIcons, 'menu', 24, '#FFFFFF'],
    'ios-menu': [Ionicons, 'ios-menu-outline', 24, '#FFFFFF'],
    'notifications': [Ionicons, 'md-notifications', 24, '#FFFFFF'],
    'cancel': [Ionicons, 'md-close', 24, '#FFFFFF']
};

const IconsMap = {};
const IconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName =>
            icons[iconName][0].getImageSource(
                icons[iconName][1],
                icons[iconName][2],
                icons[iconName][3]
            ))
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => IconsMap[iconName] = sources[idx]);
        resolve(true);
    })
});

export {
    IconsMap,
    IconsLoaded
};
