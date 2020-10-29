var mixpanel = require('mixpanel-browser');
mixpanel.init("dd5d4e26dd578f9a79ba6ea749882465");

export default function track(eventName, options = {}) {
    return mixpanel.track(eventName, options);
}
