import { useContext, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { DataMusics } from '~/Layout/DefaultLayout/DefaultLayout';

function Playing() {
    const { song, pauseTest, setPauseTest } = useContext(DataMusics);
    // console.log(pauseTest);
    // const player = useRef();
    // const audiofunction = () => {
    //     console.log('test');
    //     player.current.audio.current.pause();
    // };
    // const handlePlay = () => {
    //     setPauseTest(true);
    // };
    // const handlePause = () => {
    //     setPauseTest(false)
    // };
    return (
        <div className="border-t border-hover_color">
            {/* <button onClick={audiofunction}>pause</button> */}
            <AudioPlayer
                className="player-music"
                // src={song.url}
                // preload="metadata"
                showSkipControls={true}
                showJumpControls={false}
                // onPlay={(e) => {
                //     handlePlay();
                // }}
                // onPause={(e) => {
                //     handlePause();
                // }}
                // ref={player}
                // onClickNext={handleNext}
                // onClickPrevious={handlePrevious}
                // onEnded={handelEnd}
            />
        </div>
    );
}

export default Playing;
