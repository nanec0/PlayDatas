import React, { useState, useEffect } from 'react';
import InteractiveMap from './components/InteractiveMap';
import DataEntryPanel from './components/DataEntryPanel';
import RealTimeTable from './components/RealTimeTable';
import ExportButtons from './components/ExportButtons';
import StatisticsChart from './components/StatisticsChart';
import TeamManagement from './components/TeamManagement';
import PreMatchConfig from './components/PreMatchConfig';
import { Play, Team } from './types';

function App() {
  const [plays, setPlays] = useState<Play[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState<'teams' | 'prematch' | 'match'>('teams');
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);
  const [homeColor, setHomeColor] = useState<string>('#8884d8');
  const [awayColor, setAwayColor] = useState<string>('#82ca9d');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addPlay = (play: Play) => {
    setPlays([...plays, play]);
  };

  const switchTeam = () => {
    setActiveTeam(activeTeam === homeTeam ? awayTeam : homeTeam);
    setSelectedZone(null);
  };

  const handleMatchStart = (home: Team, away: Team) => {
    setHomeTeam(home);
    setAwayTeam(away);
    setActiveTeam(home);
    setCurrentPage('match');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Football Statistics Tracker</h1>
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage('teams')}
          className={`p-2 rounded ${currentPage === 'teams' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Teams
        </button>
        <button
          onClick={() => setCurrentPage('prematch')}
          className={`p-2 rounded ${currentPage === 'prematch' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pre-Match Setup
        </button>
        <button
          onClick={() => setCurrentPage('match')}
          className={`p-2 rounded ${currentPage === 'match' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          disabled={!homeTeam || !awayTeam}
        >
          Match
        </button>
      </div>
      {currentPage === 'teams' && <TeamManagement />}
      {currentPage === 'prematch' && <PreMatchConfig onMatchStart={handleMatchStart} />}
      {currentPage === 'match' && homeTeam && awayTeam && activeTeam && (
        <div>
          <div className="mb-4 flex justify-center space-x-4">
            <div>
              <label htmlFor="homeColor" className="mr-2">Home Team Color:</label>
              <input
                type="color"
                id="homeColor"
                value={homeColor}
                onChange={(e) => setHomeColor(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="awayColor" className="mr-2">Away Team Color:</label>
              <input
                type="color"
                id="awayColor"
                value={awayColor}
                onChange={(e) => setAwayColor(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InteractiveMap
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
                activeTeam={activeTeam === homeTeam ? 'home' : 'away'}
              />
            </div>
            <div>
              <DataEntryPanel
                addPlay={addPlay}
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
                isMobile={isMobile}
                activeTeam={activeTeam}
                teamColor={activeTeam === homeTeam ? homeColor : awayColor}
                onTeamSwitch={switchTeam}
              />
              <RealTimeTable plays={plays} homeColor={homeColor} awayColor={awayColor} />
              <ExportButtons plays={plays} />
              <StatisticsChart plays={plays} homeColor={homeColor} awayColor={awayColor} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;