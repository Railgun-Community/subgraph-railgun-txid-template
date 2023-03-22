import {
  assert,
  describe,
  test,
  beforeAll,
  afterAll,
  newMockEvent,
} from 'matchstick-as/assembly/index';
import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { idFrom2PaddedBigInts, idFromEventLogIndex } from '../../src/id';

describe('id', () => {
  beforeAll(() => {});

  afterAll(() => {});

  test('Should create ID from 2 padded bigints', () => {
    assert.bytesEquals(
      idFrom2PaddedBigInts(BigInt.fromString('2'), BigInt.fromString('3')),
      Bytes.fromHexString(
        '0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003',
      ),
    );
  });

  test('Should create ID from event log index', () => {
    assert.bytesEquals(
      idFromEventLogIndex(newMockEvent()),
      Bytes.fromHexString('0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000'),
    );

    const event = newMockEvent();
    event.transaction.hash = Bytes.fromHexString('0x01');
    event.logIndex = BigInt.fromString('2');

    assert.bytesEquals(
      idFromEventLogIndex(event),
      Bytes.fromHexString('0x0102000000'), // Note: logIndex is little-endian.
    );
  });
});