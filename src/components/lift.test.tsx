import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {Lift} from './lift';

describe('lift', () => {
    it('should exist', () => {
        expect(Lift).toBeDefined();
    });
    it('should render', () => {
        const result = mount(
            <Lift 
                totalFloors={1} 
                totalRooms={1} 
                currentCoord={{floor: 0, room: 0}}
                transitionTime={0}
                onLiftArrived={() => null} 
            />
        );
        expect(result.exists()).toBe(true);
    });

    describe('movement', () => {
        it('should call onTransitionEnd after transitionTime ms once', done => {
            const onLiftArrived = jest.fn();
            mount(
                <Lift 
                    totalFloors={1} 
                    totalRooms={1} 
                    currentCoord={{floor: 0, room: 0}}
                    transitionTime={10}
                    onLiftArrived={onLiftArrived} 
                />
            );
            window.setTimeout(
                () => {
                    expect(onLiftArrived.mock.calls.length).toBe(1); 
                    done();
                }, 
                150
            );
        });
    });
});
