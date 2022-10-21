import React, { ReactElement } from 'react'
import styles from './index.module.css'
import Markdown from '../../atoms/Markdown'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'
import { ReactComponent as PeaqLogo } from '../../../images/peaq-logo-stoke.svg'
import Links from './Links'
import Container from '../../atoms/Container'

export default function Footer(): ReactElement {
  const { footer } = useSiteMetadata()
  const { copyright } = footer

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div>
          <a
            href="https://www.peaq.network/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.main}>
              <PeaqLogo />
            </div>
          </a>
        </div>
        <Links />
      </Container>
      <div className={styles.copyright}>
        <Markdown text={copyright} />
      </div>
    </footer>
  )
}
