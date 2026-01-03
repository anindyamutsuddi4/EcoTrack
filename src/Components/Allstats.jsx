import React from 'react';
import DemoChallengeGraph from './Stats';
import ImpactDurationChart from './Stats3';
import DemoRemainingDaysChart from './statsRemainingDays';
const Allstats = () => {
    return (
        <div className='bg-primary pt-27 lg:pb-9 pb-3'>
              <div id='statssection' className="text-center mb-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                    Global Stats
                </h2>
                <p className="mt-2 text-white/70 text-sm sm:text-base">
                    Overview of all challenges and participants worldwide
                </p>
            </div>
            <DemoChallengeGraph></DemoChallengeGraph>
            <DemoRemainingDaysChart></DemoRemainingDaysChart>
            <ImpactDurationChart></ImpactDurationChart>
        </div>
    );
};

export default Allstats;