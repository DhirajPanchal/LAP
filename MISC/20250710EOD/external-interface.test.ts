
import axios from 'axios';
import * as api from '../axios/external-interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('external-interface API methods', () => {
  beforeEach(() => {
    localStorage.setItem('persist:frame', JSON.stringify({
      auth: JSON.stringify({
        auth: {
          dspToken: { tokenId: 'dummy-token' },
          user: { currentUser: { name: 'Test User' } }
        }
      })
    }));
  });

  it('loadGradeRecords - should post to /records/query', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({ data: { data: [{ id: 1 }] } });
    const res = await api.loadGradeRecords({ skip: 0, limit: 10, filter_by_list: [] });
    expect(mockedAxios.post).toHaveBeenCalledWith('/records/query', { skip: 0, limit: 10, filter_by_list: [] });
    expect(res.data[0].id).toBe(1);
  });

  it('loadDashboardSummary - should GET dashboard metrics', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data: { total: 100 } });
    const res = await api.loadDashboardSummary();
    expect(mockedAxios.get).toHaveBeenCalledWith('/records/dashboard-metrics');
    expect(res.total).toBe(100);
  });

  it('revokeRecord - should DELETE with record id', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.delete.mockResolvedValue({ data: {} });
    const res = await api.revokeRecord(5);
    expect(mockedAxios.delete).toHaveBeenCalledWith('/records/5');
  });

  it('updateRecord - should PUT with record id and payload', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.put.mockResolvedValue({ data: {} });
    await api.updateRecord(1, { status: 'UPDATED' });
    expect(mockedAxios.put).toHaveBeenCalledWith('/records/1', { status: 'UPDATED' });
  });

  it('insertRecord - should POST with payload', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({ data: {} });
    await api.insertRecord({ field: 'value' });
    expect(mockedAxios.post).toHaveBeenCalledWith('/records', { field: 'value' });
  });

  it('submitRecord - should POST to /records/submit', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({ data: { status: 'ok' } });
    const res = await api.submitRecord({ id: 1 });
    expect(mockedAxios.post).toHaveBeenCalledWith('/records/submit', { id: 1 });
    expect(res.status).toBe('ok');
  });

  it('loadChangeLog - should POST with audit log query', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({ data: { data: [{ action: 'viewed' }] } });
    const res = await api.loadChangeLog(42);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(res[0].action).toBe('viewed');
  });

  it('loadUsersByRegionRole - should POST with region and role', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({ data: [{ id: 1 }] });
    const res = await api.loadUsersByRegionRole('Asia', 'Reviewer');
    expect(mockedAxios.post).toHaveBeenCalledWith('/user/users/query', {
      regions: ['Asia'],
      roles: ['Reviewer'],
    });
    expect(res[0].id).toBe(1);
  });

  it('loadUserRolesAuth - should GET permissions', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data: ['VIEW', 'EDIT'] });
    const res = await api.loadUserRolesAuth();
    expect(mockedAxios.get).toHaveBeenCalledWith('/user/users/current/permissions');
    expect(res).toContain('EDIT');
  });

  it('createCurrentUserAPI - should POST to current user', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.post.mockResolvedValue({ data: { success: true } });
    const res = await api.createCurrentUserAPI();
    expect(mockedAxios.post).toHaveBeenCalledWith('/user/users/current');
    expect(res.success).toBe(true);
  });
});
