import createKnockKnockGo from 'knock-knock-go';
import ErrorComponent from './error';
import React from 'react';
import Waiting from 'waiting';

export default createKnockKnockGo(Waiting, ErrorComponent);
