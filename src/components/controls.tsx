import * as React from 'react';
import {Store} from '../store';

export type Props = {
    disabled: boolean,
    nextBuildingSize: Store['nextBuildingSize'],
    fromCoord: Store['fromCoord'],
    toCoord: Store['toCoord'],
    onFloorsQuantityInput: React.ChangeEventHandler<HTMLInputElement>,
    onRoomsQuantityInput: React.ChangeEventHandler<HTMLInputElement>,
    onFromFloorInput: React.ChangeEventHandler<HTMLInputElement>,
    onFromRoomInput: React.ChangeEventHandler<HTMLInputElement>,
    onToFloorInput: React.ChangeEventHandler<HTMLInputElement>,
    onToRoomInput: React.ChangeEventHandler<HTMLInputElement>,
    onGenerate: () => void,
    onGo: () => void
};

export const Controls: React.StatelessComponent<Props> = ({
    disabled,
    nextBuildingSize,
    fromCoord,
    toCoord,
    onFloorsQuantityInput,
    onRoomsQuantityInput,
    onFromFloorInput,
    onFromRoomInput,
    onToFloorInput,
    onToRoomInput,
    onGenerate,
    onGo
}) => {
    return (
        <div className="controls">
            <div className="controls-line">
                <div className="input-field control-item-wide-1">
                    <input 
                        placeholder="Placeholder" 
                        id="floors-quantity" 
                        type="number" 
                        className="validate"
                        disabled={disabled}
                        value={nextBuildingSize.floors}
                        onChange={onFloorsQuantityInput}
                    />
                    <label>Floors</label>
                </div>
                <div className="input-field control-item-wide-2">
                    <input 
                        placeholder="Placeholder" 
                        id="rooms-quantity" 
                        type="number" 
                        className="validate"
                        disabled={disabled}                        
                        value={nextBuildingSize.rooms}
                        onChange={onRoomsQuantityInput}
                    />
                    <label>Rooms</label>
                </div>
                <a 
                    className={`waves-effect waves-light btn control-button ${disabled ? 'disabled' : ''}`} 
                    onClick={onGenerate}
                >generate
                </a>
            </div>
            <div className="controls-line">
                <div className="input-field">
                    <input 
                        placeholder="Placeholder" 
                        id="from-floor" 
                        type="number" 
                        className="validate"
                        disabled={disabled}                        
                        value={fromCoord.floor}
                        onChange={onFromFloorInput}
                    />
                    <label>from floor</label>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Placeholder" 
                        id="from-room" 
                        type="number" 
                        className="validate"
                        disabled={disabled}                        
                        value={fromCoord.room}
                        onChange={onFromRoomInput}
                    />
                    <label>from room</label>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Placeholder" 
                        id="to-floor" 
                        type="number" 
                        className="validate"
                        disabled={disabled}                        
                        value={toCoord.floor}
                        onChange={onToFloorInput}
                    />
                    <label>to floor</label>
                </div>
                <div className="input-field">
                    <input 
                        placeholder="Placeholder" 
                        id="to-room" 
                        type="number" 
                        className="validate"
                        disabled={disabled}                        
                        value={toCoord.room}
                        onChange={onToRoomInput} 
                    />
                    <label>to room</label>
                </div>
                <a 
                    className={`waves-effect waves-light btn control-button ${disabled ? 'disabled' : ''}`} 
                    onClick={onGo}
                >go
                </a>
            </div>
        </div>
    );
};