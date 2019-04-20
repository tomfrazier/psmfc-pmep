import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import styled, { themeGet } from 'util/style'
import { splitWords } from 'util/format'
import { sppEOLIDs } from '../../../config/constants'

const List = styled.ul`
  margin-bottom: 0;
  line-height: 1.2;
  li {
    margin: 0;

    & + li {
      margin-top: 0.5rem;
    }
  }
`

const InventoryStatus = styled.p`
  color: ${themeGet('colors.grey.700')};
  font-size: 0.8rem;
`

const NoSpecies = styled.div`
  color: ${themeGet('colors.grey.700')};
  font-size: 0.8rem;
`

const Stage = styled.span`
  margin-left: 0.5em;
  font-size: smaller;
  font-style: italic;
  color: ${themeGet('colors.grey.700')};
`

const SpeciesList = ({ species: data, status }) => {
  // not inventoried
  if (status === 3) {
    return (
      <InventoryStatus>
        This estuary was not inventoried for species in the &nbsp;
        <OutboundLink
          from="/"
          to="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          2014 State of the Knowledge Report.
        </OutboundLink>
      </InventoryStatus>
    )
  }

  const entries = Object.entries(data).map(([species, stage]) => ({
    species,
    stage,
  }))

  // sort by name
  entries.sort((a, b) => (a.species > b.species ? 1 : -1))

  const statusNote =
    status === 1
      ? 'This estuary was inventoried for species in the '
      : 'Note: species were inventoried within a larger estuary system or sub-basin containing this particular estuary for the '

  return (
    <>
      {entries.length > 0 ? (
        <List>
          {entries.map(({ species, stage }) => (
            <li>
              {/* TODO */}
              <OutboundLink
                from="/"
                to={`http://eol.org/pages/${sppEOLIDs[species]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {splitWords(species)}
                {stage === 'JP' && <Stage>(juvenile)</Stage>}
              </OutboundLink>
            </li>
          ))}
        </List>
      ) : (
        <NoSpecies>No focal species present</NoSpecies>
      )}

      <InventoryStatus>
        {statusNote}
        <OutboundLink
          from="/"
          to="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          2014 State of the Knowledge Report.
        </OutboundLink>
      </InventoryStatus>
    </>
  )
}

SpeciesList.propTypes = {
  species: PropTypes.objectOf(PropTypes.string).isRequired,
  status: PropTypes.number.isRequired,
}

export default SpeciesList
