import Ionicons from 'react-native-vector-icons/Ionicons'

const icons = {
    'menu': [Ionicons, 'md-menu', 24, '#FFFFFF'],
    'notifications': [Ionicons, 'md-notifications', 24, '#FFFFFF'],
    'cancel': [Ionicons, 'md-close', 24, '#FFFFFF'],
    'back': [Ionicons, 'ios-arrow-back', 24, '#FFFFFF'],
    'trash': [Ionicons, 'md-trash', 24, '#FFFFFF'],
    'globe': [Ionicons, 'ios-globe-outline', 24, '#FFFFFF']
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
