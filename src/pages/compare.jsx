import React, { useState } from 'react'

import { useData } from 'components/Data'
import {
  Provider as CrossfilterProvider,
  FilteredMap,
} from 'components/Crossfilter'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import Sidebar, { SidebarHeader, SidebarHelp } from 'components/Sidebar'
import EstuaryDetails from 'components/EstuaryDetails'
import { Flex } from 'components/Grid'
import FiltersList from 'components/FiltersList'
import styled from 'util/style'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Compare = () => {
  const [data, index] = useData()

  const [selectedId, setSelectedId] = useState(null)

  const handleSelect = id => {
    console.log('onSelect', id)
    setSelectedId(id)
  }

  return (
    <CrossfilterProvider data={data} filters={filters}>
      <Layout>
        <SEO title="Compare" />
        <Wrapper>
          <Sidebar>
            {selectedId !== null ? (
              <EstuaryDetails
                {...index.get(selectedId.toString()).toJS()}
                onBack={() => handleSelect(null)}
              />
            ) : (
              <>
                <SidebarHeader icon="slidersH" title="Compare Estuaries" />
                <SidebarHelp>
                  Click on an estuary in the list below or in the map for more
                  detailed information. Estuary boundaries will show on the map
                  when you have zoomed far enough in. This list only shows
                  estuaries visible in the map. The charts below show estuaries
                  within the extent of the map that meet each of the filters you
                  set. Click on one or more filter bars to select all estuaries
                  that match. Filters can also be combined across groups, such
                  as &quot;Riverine Estuary&quot;, &quot;0-25 acres&quot;,
                  &quot;Washington&quot; to show all small riverine estuaries in
                  Washington state. Select multiple categories within a group to
                  show estuaries that meet any of those conditions. As you zoom
                  in, the charts will update based on the extent of the map
                  <br />
                  Click on an estuary in the map for more information.
                </SidebarHelp>
                <FiltersList />
              </>
            )}
          </Sidebar>

          <FilteredMap
            selectedFeature={selectedId}
            onSelectFeature={handleSelect}
          />
        </Wrapper>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Compare
