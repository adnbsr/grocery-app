/**
 * Created by adnanbasar on 20/05/2017.
 *
 * @flow
 */

import LocaleManager from './LocaleManager'

const strings = {
    en: {
        appName: 'Sebetim',
        account: 'My Account',
        add: 'Add',
        address: 'Address',
        cancel: 'Cancel',
        cart: 'Cart',
        checkout: 'Checkout',
        clearCartMessage: 'Do you want to remove all items from cart?',
        clearCartTitle: 'Clear Items from Cart',
        currency: 'TMT',
        english: 'English',
        express: 'Express',
        expressMessage: 'EXPRESS: By Tomorrow 8:30 AM',
        home: 'Home',
        itemAdded: 'Item is added to Cart',
        items: 'Items',
        itemRemoved: 'Item is removed from Cart',
        localeChoose: 'Choose your language:',
        localeUpdate: 'Language will change after restart',
        login: 'Login',
        logout: 'Logout',
        name: 'Name',
        notifications: 'Notifications',
        orderGiven: 'Order is given and waiting for approval',
        password: 'Password',
        password6Characters: 'Password must be at least 6 characters',
        phone: 'Phone',
        phonePasswordWrong: 'Phone or Password is wrong!',
        register: 'Register',
        remove: 'Remove',
        russian: 'Russian',
        save: 'Save',
        search: 'Search',
        shopCategory: 'Shop By Category',
        shopOffers: 'Shop By Offers',
        standard: 'Standard',
        standardMessage: 'STANDART: Tomorrow 5:00 PM to 19:30 PM',
        turkmen: 'Turkmence',
        unknown: 'Unknown',
        usernameExits: 'This phone is already registered!',
        welcome: 'Welcome'
    },
    tm: {
        appName: 'Sebetim',
        account: 'Hesabim',
        add: 'Add',
        address: 'Address',
        cancel: 'Cancel',
        cart: 'Cart',
        checkout: 'Checkout',
        clearCartMessage: 'Do you want to remove all items from cart?',
        clearCartTitle: 'Clear Items from Cart',
        currency: 'TMT',
        english: 'English',
        express: 'Express',
        expressMessage: 'EXPRESS: By Tomorrow 8:30 AM',
        home: 'Home',
        itemAdded: 'Item is added to Cart',
        items: 'Items',
        itemRemoved: 'Item is removed from Cart',
        localeChoose: 'Choose your language:',
        localeUpdate: 'Language will change after restart',
        login: 'Login',
        logout: 'Logout',
        name: 'Name',
        notifications: 'Notifications',
        orderGiven: 'Order is given and waiting for approval',
        password: 'Password',
        password6Characters: 'Password must be at least 6 characters',
        phone: 'Phone',
        phonePasswordWrong: 'Phone or Password is wrong!',
        register: 'Register',
        remove: 'Remove',
        russian: 'Russian',
        save: 'Save',
        search: 'Search',
        shopCategory: 'Shop By Category',
        shopOffers: 'Shop By Offers',
        standard: 'Standard',
        standardMessage: 'STANDART: Tomorrow 5:00 PM to 19:30 PM',
        turkmen: 'Turkmence',
        unknown: 'Unknown',
        usernameExits: 'This phone is already registered!',
        welcome: 'Welcome'
    },
    ru: {
        appName: 'Sebetim',
        account: 'My Account',
        add: 'Add',
        address: 'Address',
        cancel: 'Cancel',
        cart: 'Cart',
        checkout: 'Checkout',
        clearCartMessage: 'Do you want to remove all items from cart?',
        clearCartTitle: 'Clear Items from Cart',
        currency: 'TMT',
        english: 'English',
        express: 'Express',
        expressMessage: 'EXPRESS: By Tomorrow 8:30 AM',
        home: 'Home',
        itemAdded: 'Item is added to Cart',
        items: 'Items',
        itemRemoved: 'Item is removed from Cart',
        localeChoose: 'Choose your language:',
        localeUpdate: 'Language will change after restart',
        login: 'Login',
        logout: 'Logout',
        name: 'Name',
        notifications: 'Notifications',
        orderGiven: 'Order is given and waiting for approval',
        password: 'Password',
        password6Characters: 'Password must be at least 6 characters',
        phone: 'Phone',
        phonePasswordWrong: 'Phone or Password is wrong!',
        register: 'Register',
        remove: 'Remove',
        russian: 'Russian',
        save: 'Save',
        search: 'Search',
        shopCategory: 'Shop By Category',
        shopOffers: 'Shop By Offers',
        standard: 'Standard',
        standardMessage: 'STANDART: Tomorrow 5:00 PM to 19:30 PM',
        turkmen: 'Turkmence',
        unknown: 'Unknown',
        usernameExits: 'This phone is already registered!',
        welcome: 'Welcome'
    }
}

export default strings[LocaleManager.locale]