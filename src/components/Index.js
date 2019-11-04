import React from 'react';
import TopTracks from './layout/TopTracks';
import Search from './layout/Search';

const Index = () => {
    return (
        <React.Fragment>
            <Search />
            <TopTracks />
        </React.Fragment>
    );
};

export default Index;