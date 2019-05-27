# [SHOKUNIN 2019] May Challenge: Sensor Sensibility

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![CircleCI](https://circleci.com/gh/schalela/sensors-sensibility.svg?style=svg)](https://circleci.com/gh/schalela/sensors-sensibility)

The May TW Shokunin challenge is to read the sensor data from the stream and create visualisations of the rolling average for each of the:

* temperature
* humidity
* radiation 
* light readings

for the underlying sensor groups as well as totals across all groups.
 
The visualisations should be updated in near real time.

The sensor stream to connect to can be found here: https://www.pubnub.com/developers/realtime-data-streams/sensor-network/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run locally, this application requires Node.js 10+.

### Run the application

`./go.sh` 

This will start a server in localhost:3000

## Running the tests

```
yarn test
```

## Built With

* [Next.js](https://nextjs.org/) - The React Framework
* [Styled Components](https://www.styled-components.com/) - Visual primitives for the component age
* [RxJS](https://rxjs-dev.firebaseapp.com/) - Reactive Extensions Library for JavaScript
* [Jest](https://jestjs.io/) - Delightful JavaScript Testing

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details