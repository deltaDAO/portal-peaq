import React, { FormEvent, ReactElement } from 'react'
import { ReactComponent as SearchIcon } from '../../images/search.svg'
import styles from './SearchButton.module.css'
import { useUserPreferences } from '../../providers/UserPreferences'

export default function SearchButton(): ReactElement {
  const isHome = window.location.pathname === '/'
  const {
    isSearchBarVisible,
    setSearchBarVisible,
    homeSearchBarFocus,
    setHomeSearchBarFocus
  } = useUserPreferences()

  async function handleButtonClick(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (isHome) {
      setHomeSearchBarFocus(!homeSearchBarFocus)
      setSearchBarVisible(false)
      return
    }
    setSearchBarVisible(!isSearchBarVisible)
  }

  return (
    <div className={styles.search}>
      <button onClick={handleButtonClick} className={styles.button}>
        <SearchIcon className={styles.searchIcon} />
      </button>
    </div>
  )
}
