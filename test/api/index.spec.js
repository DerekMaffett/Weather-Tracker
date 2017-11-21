import axios from 'axios';
import sinon from 'sinon';

import { fetchSuggestions, fetchCurrentWeather } from '../../src/api';

describe('api', () => {
    describe('fetchSuggestions', () => {
        beforeEach(() => {
            sinon.stub(axios, 'get').returns(Promise.resolve({
                data: [{
                    name: 'Midgard'
                }, {
                    name: 'Asgard'
                }]
            }));
        });

        afterEach(() => {
            axios.get.restore();
        });

        it('should fetch city name suggestions', (done) => {
            fetchSuggestions('gard')
                .then((suggestions) => {
                    expect(suggestions).to.deep.equal(['Midgard', 'Asgard']);

                    done();
                }).catch(done);
        });
    });

    describe('fetchCurrentWeather', () => {
        beforeEach(() => {
            sinon.stub(axios, 'get').returns(Promise.resolve({
                data: {
                    location: {
                        name: 'London',
                        country: 'United Kingdom'
                    },
                    current: {
                        temp_c: 20,
                        is_day: 1,
                        condition: {
                            text: 'Sunny'
                        }
                    }
                }
            }));
        });

        afterEach(() => {
            axios.get.restore();
        });

        it('should fetch current weather for a city', (done) => {
            fetchCurrentWeather('London')
                .then((weatherReport) => {
                    expect(weatherReport).to.deep.equal({
                        location: {
                            name: 'London',
                            country: 'United Kingdom'
                        },
                        weather: {
                            tempC: 20,
                            isDay: true,
                            condition: 'Sunny'
                        }
                    });

                    done();
                }).catch(done);
        });
    });
});
