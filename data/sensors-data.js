
import PubNub from 'pubnub';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

export default {
  init: listener => {
    pubnub.addListener(listener);

    pubnub.subscribe({
      channels: ['pubnub-sensor-network']
    });
  }
};
