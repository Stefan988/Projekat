import React from 'react';
import { Menu } from 'semantic-ui-react';
import Axios from 'axios';

interface DayWeather {
    timepoint: number,
    weather: string,
    temp2m: {
        max: number,
        min: number
    },
}

export default function Weather() {
    const [weather, setWeather] = React.useState<DayWeather | undefined>(undefined);
    const [error, setError] = React.useState('');
    const selectIcon = (input: string) => {
        input = input.toLocaleLowerCase();
        switch (input) {
            case 'lightrain':
                return 'cloud';
            case 'rain':
                return 'cloud';
            case 'tsrain':
                return 'lightning';
            case 'ts':
            case 'clear':
                return 'sun';
            default:
                return 'cloud';
        }
    }
    React.useEffect(() => {
        Axios.get('https://localhost:5000/weather').then(value => {
            console.log(value.data);
            setWeather({ ...value.data });
        }).catch(err => {
            setError('Could not connect to the weather api');
        })
    }, [])

    return (
        <Menu.Menu >
            <Menu.Item icon={selectIcon(weather ? weather.weather : '')} />
            {error === '' ? (<Menu.Item className='inverted' >
                Temrature {(weather) ? `min: ${weather.temp2m.min}    max: ${weather.temp2m.max}C` : 'connecting'}
            </Menu.Item>) : (
                    <Menu.Item className='inverted'>
                        {error}
                    </Menu.Item>
                )}
        </Menu.Menu >
    );
}
