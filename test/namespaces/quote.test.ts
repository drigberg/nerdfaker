import { dataByUniverse } from '../../src/data';
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { Nerdata } from '../../src/Nerdata'

describe('Quote', () => {
  let data: any
  let nerdata: Nerdata

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'rick-and-morty'] })

    const rickAndMortyQuotes = dataByUniverse['rick-and-morty'].quotes
    const starWarsQuotes = dataByUniverse['star-wars'].quotes

    data = {
      rickAndMorty: {
        full: rickAndMortyQuotes,
        text: rickAndMortyQuotes.map((item: any) => item.text),
      },
      starWars: {
        full: starWarsQuotes,
        text: starWarsQuotes.map((item: any) => item.text),
      },
    }
  })

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys((new Nerdata()).quote)).to.have.same.members([
        'sentence',
        'paragraph',
      ])
    })
  })

  describe('sentence', () => {
    it('returns a string', () => {
      expect(nerdata.quote.sentence()).to.be.a('string')
    })

    describe('citation = true', () => {
      it('returns a string', () => {
        expect(nerdata.quote.sentence(undefined, { citation: true })).to.be.a('string')
      })

      it('appends speaker', () => {
        for (let i = 0; i < 10; i++) {
          const sentence = nerdata.quote.sentence(undefined, { citation: true })
          const all = data.rickAndMorty.full.concat(data.starWars.full)
          const match = all.find((quote: any) => sentence.includes(quote.text) && sentence.includes(quote.speaker))

          expect(match).to.be.an('object')
          expect(sentence).to.equal(`"${match.text}" - ${match.speaker}`)
        }
      })
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.text).to.include(
          nerdata.quote.sentence('star-wars'),
        )
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.text).to.include(
          nerdata.quote.sentence(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.text.concat(data.starWars.text)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.quote.sentence(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.quote.sentence('dune')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars',
      )
    })
  })

  describe('paragraph', () => {
    it('returns a string', () => {
      expect(nerdata.quote.paragraph()).to.be.a('string')
    })

    it('opts.sentences = 1', () => {
      const paragraph = nerdata.quote.paragraph(undefined, { sentences: 1 })
      expect(paragraph).to.be.a('string')
      expect(data.rickAndMorty.text.concat(data.starWars.text)).to.include(
        paragraph,
      )
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.text).to.include(
          nerdata.quote.paragraph('star-wars', { sentences: 1 }),
        )
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.text).to.include(
          nerdata.quote.paragraph(['star-wars'], { sentences: 1 }),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.text.concat(data.starWars.text)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.quote.paragraph(['star-wars', 'rick-and-morty'], {
            sentences: 1,
          }),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.quote.paragraph('dune')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars',
      )
    })
  })
})
