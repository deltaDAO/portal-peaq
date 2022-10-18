import React, { ReactElement } from 'react'
import styles from './PromotionBanner.module.css'
import Markdown from '../atoms/Markdown'
import Button from '../atoms/Button'
import { ReactComponent as MoveIdLogo } from '../../images/moveID-logo.svg'

export interface PromoBanner {
  title: string
  description?: string
  cta?: string
  link: string
}

export default function PromotionBanner({
  title,
  description,
  cta,
  link
}: PromoBanner): ReactElement {
  return (
    <div className={styles.banner}>
      <div className={styles.contentWrapper}>
        <h2>Featured portals</h2>
        <div className={styles.cardContainer}>
          <div className={styles.logoContainer}>
            <MoveIdLogo />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.title}>{title}</h2>
            {description && (
              <Markdown text={description} className={styles.description} />
            )}
            <Button
              style="text"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
