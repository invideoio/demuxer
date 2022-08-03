import { Events } from '../../src/index';
import { TSDemux } from '../../src/m2t/demux';
import EventEmitter from '../../src/util/event-emitter';
import ErrorCode from '../../src/mux-error-code';

describe('M2T Demux', () => {
  // let demuxer;
  let context = {
    debug: true, // if env is production, debug should be false or not specified.
    enableWorker: false,
    decodeCodec: true
  };

  beforeEach(() => {
    // demuxer = new TSDemux(context);
  });

  describe('multipleGops', () => {
    it('should demux 2 gops', (done) => {
      const demuxer = new TSDemux(context);

      let demuxedData;
      demuxer.on(Events.DEMUX_DATA, (d) => {
        // console.log('>>>>', d.videoTrack.gops.length, d.videoTrack.gops.map(g => g.length).join(','));
        demuxedData = d;
      });

      fetch('/base/test/m2t/fixtures/2_gops.ts')
        .then(res => res.arrayBuffer())
        .then(buff => {
          demuxer.push(buff, { done: true })
          expect(demuxedData.videoTrack.gops.length).toEqual(2);
          done();
        });
    });

    it('should demux 3 gops', (done) => {
      const demuxer = new TSDemux(context);

      let demuxedData;
      demuxer.on(Events.DEMUX_DATA, (d) => {
        // console.log('>>>>', d.videoTrack.gops.length, d.videoTrack.gops.map(g => g.length).join(','));
        demuxedData = d;
      });

      fetch('/base/test/m2t/fixtures/3_gops.ts')
        .then(res => res.arrayBuffer())
        .then(buff => {
          demuxer.push(buff, { done: true });
          expect(demuxedData.videoTrack.gops.length).toEqual(3);
          done();
        });
    });
  });
});
