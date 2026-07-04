import { describe, it, expect } from 'vitest';
import { parseAuthorFromPath } from '../src/content/adapters/tiktok';

describe('parseAuthorFromPath', () => {
  it('trích @handle + videoId từ path video', () => {
    expect(parseAuthorFromPath('/@bbcnews/video/7301234567890123456')).toEqual({
      handle: 'bbcnews',
      videoId: '7301234567890123456',
    });
  });

  it('chấp nhận handle có dấu chấm/gạch', () => {
    expect(parseAuthorFromPath('/@vtv.24_official/video/123')?.handle).toBe('vtv.24_official');
  });

  it('bỏ qua query string sau path', () => {
    expect(parseAuthorFromPath('/@abc/video/999?is_from=copy')?.videoId).toBe('999');
  });

  it('trả null cho For You / trang khác', () => {
    expect(parseAuthorFromPath('/foryou')).toBeNull();
    expect(parseAuthorFromPath('/@abc')).toBeNull();
    expect(parseAuthorFromPath('/')).toBeNull();
  });
});
