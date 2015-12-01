import createKnockKnockGo from 'knock-knock-go';
import ErrorComponent from './error';
import LoadingComponent from './loading';
import React from 'react';

export default createKnockKnockGo(LoadingComponent, ErrorComponent);
