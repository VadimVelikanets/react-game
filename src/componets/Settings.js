import React from 'react';
const Settings = (props) =>{
    return(
        <div className="setting">
            <h1>Settings</h1>
            <div className="settings-item">
                <span>Second player PC</span>
                <div>
                    <button onClick={value => props.changePlayer(true)} className={`${props.isPCPlayer ? "btn-active" : ""}`}>On</button>
                    <button onClick={ value => props.changePlayer(false)} className={`${!props.isPCPlayer ? "btn-active" : ""}`}>Off</button>
                </div>

            </div>
            <div className="settings-item">
                <span>Sound</span>
                <div>
                    <button onClick={value => props.soundOff(true)} className={`${props.soundValue ? "btn-active" : ""}`}>On</button>
                    <button onClick={ value => props.soundOff(false)} className={`${!props.soundValue ? "btn-active" : ""}`}> Off</button>
                </div>

            </div>
            <div className="settings-item">
                <span>You play for</span>
                <div>
                    <button onClick={value => props.crossOrZero(true)} className={`${props.CrossZeroValue ? "btn-active" : ""}`}>X</button>
                    <button onClick={ value => props.crossOrZero(false)} className={`${!props.CrossZeroValue ? "btn-active" : ""}`}> 0</button>
                </div>

            </div>
            <div className="settings-item">
                <span>Show score</span>
                <div>
                    <button onClick={value => props.showScore(true)} className={`${props.isShowScore ? "btn-active" : ""}`}>On</button>
                    <button onClick={ value => props.showScore(false)} className={`${!props.isShowScore ? "btn-active" : ""}`}> Off</button>
                </div>

            </div>
        </div>
    )
}
export default Settings;