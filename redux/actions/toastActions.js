import { createAction } from '@reduxjs/toolkit';

// Action to clear the error
export const clearError = createAction('clearError');

// Action to clear the message
export const clearMessage = createAction('clearMessage');