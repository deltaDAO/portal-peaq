import React, { ReactElement, useEffect, useState } from 'react'
import Tabs from '../../../atoms/Tabs'
import PublishedList from './PublishedList'
import Downloads from './Downloads'
import ComputeJobs from './ComputeJobs'
import { useLocation } from '@reach/router'
import styles from './index.module.css'
import OceanProvider from '../../../../providers/Ocean'
import { useWeb3 } from '../../../../providers/Web3'

interface HistoryTab {
  title: string
  content: JSX.Element
}

function getTabs(accountId: string, userAccountId: string): HistoryTab[] {
  const defaultTabs: HistoryTab[] = [
    {
      title: 'Published',
      content: <PublishedList accountId={accountId} />
    },
    {
      title: 'Downloads',
      content: <Downloads accountId={accountId} />
    }
  ]
  const userTabs: HistoryTab[] = [
    {
      title: 'Compute Jobs',
      content: (
        <OceanProvider>
          <ComputeJobs />
        </OceanProvider>
      )
    }
  ]
  if (accountId === userAccountId) {
    return defaultTabs.concat(userTabs)
  }
  return defaultTabs
}

export default function HistoryPage({
  accountIdentifier
}: {
  accountIdentifier: string
}): ReactElement {
  const { accountId } = useWeb3()
  const location = useLocation()
  const [tabs, setTabs] = useState<HistoryTab[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const url = new URL(location.href)
  const defaultTab = url.searchParams.get('defaultTab')

  useEffect(() => {
    const tabs = getTabs(accountIdentifier, accountId)
    setTabs(tabs)

    const defaultTabIndex = tabs.findIndex(
      (tab) =>
        tab.title.split(' ').join('').toLowerCase() === defaultTab.toLowerCase()
    )
    setSelectedIndex(defaultTabIndex !== -1 ? defaultTabIndex : 0)
  }, [accountId, accountIdentifier, defaultTab])

  return (
    <Tabs
      items={tabs}
      className={styles.tabs}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  )
}
