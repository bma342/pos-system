import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: Record<string, unknown>;
}

interface AuditLogState {
  logs: AuditLogEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: AuditLogState = {
  logs: [],
  loading: false,
  error: null,
};

const auditLogSlice = createSlice({
  name: 'auditLog',
  initialState,
  reducers: {
    fetchLogsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLogsSuccess(state, action: PayloadAction<AuditLogEntry[]>) {
      state.logs = action.payload;
      state.loading = false;
    },
    fetchLogsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addLogEntry(state, action: PayloadAction<AuditLogEntry>) {
      state.logs.unshift(action.payload);
    },
  },
});

export const {
  fetchLogsStart,
  fetchLogsSuccess,
  fetchLogsFailure,
  addLogEntry,
} = auditLogSlice.actions;

export default auditLogSlice.reducer;
