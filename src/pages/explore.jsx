import React, { useState } from 'react'

import Layout from 'components/Layout'
import SEO from 'components/SEO'
import Map from 'components/Map'
import Sidebar from 'components/Sidebar'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'

import styled from 'util/style'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Explore = () => (
  <Layout>
    <SEO title="Home" />
    <Wrapper>
      <Sidebar icon="binoculars" title="Explore Estuaries">
        <HelpText>
          Click on an estuary in the list below or in the map for more detailed
          information. Estuary boundaries will show on the map when you have
          zoomed far enough in. This list only shows estuaries visible in the
          map.
        </HelpText>
      </Sidebar>
      <Map />
    </Wrapper>
  </Layout>
)

export default Explore
