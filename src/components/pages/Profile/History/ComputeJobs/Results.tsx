import { DDO, Logger } from '@oceanprotocol/lib'
import React, { ReactElement, useEffect, useState } from 'react'
import Loader from '../../../../atoms/Loader'
import { ComputeJobMetaData } from '../../../../../@types/ComputeJobMetaData'
import { ListItem } from '../../../../atoms/Lists'
import { useOcean } from '../../../../../providers/Ocean'
import styles from './Results.module.css'
import FormHelp from '../../../../atoms/Input/Help'
import { graphql, useStaticQuery } from 'gatsby'
import { ComputeResult } from '@oceanprotocol/lib/dist/node/ocean/interfaces/Compute'

export const contentQuery = graphql`
  query HistoryPageComputeResultsQuery {
    content: allFile(filter: { relativePath: { eq: "pages/history.json" } }) {
      edges {
        node {
          childPagesJson {
            compute {
              storage
            }
          }
        }
      }
    }
  }
`

export default function Results({
  job,
  ddo
}: {
  job: ComputeJobMetaData
  ddo: DDO
}): ReactElement {
  const data = useStaticQuery(contentQuery)
  const content = data.content.edges[0].node.childPagesJson

  const { ocean, account } = useOcean()
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const isFinished = job.dateFinished !== null

  useEffect(() => {
    async function getResults() {
      if (!account || !ocean || !job) return

      try {
        setIsLoading(true)
        const computeService = ddo.findServiceByType('compute')
        const jobStatus = await ocean.compute.status(
          account,
          job.did,
          ddo,
          computeService,
          job.jobId
        )
        if (jobStatus) {
          job.results = jobStatus[0].results
        }
      } catch (error) {
        Logger.error(error.message)
      } finally {
        setIsLoading(false)
        setHasFetched(true)
      }
    }

    getResults()
  }, [ocean, account, job, ddo])

  async function accessResult(result: ComputeResult, index: number) {
    if (!account || !ocean || !job) return
    try {
      const computeService = ddo.findServiceByType('compute')
      const jobResult = await ocean.compute.getResult(
        account,
        job.jobId,
        index,
        undefined,
        job.did,
        ddo,
        computeService
      )
      return jobResult
    } catch (error) {
      Logger.error(error.message)
    }
  }

  return (
    <div className={styles.results}>
      {hasFetched ? (
        <ul>
          {job.results &&
            Array.isArray(job.results) &&
            job.results.map((result, index) =>
              result ? (
                <ListItem key={`${job.jobId}-${index}`}>
                  <a
                    className={styles.result}
                    onClick={() => accessResult(result, index)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {result.filename}
                  </a>
                </ListItem>
              ) : (
                <ListItem>No results found.</ListItem>
              )
            )}
        </ul>
      ) : isLoading ? (
        <Loader />
      ) : (
        !isFinished && <> Waiting for results...</>
      )}
      <FormHelp className={styles.help}>{content.compute.storage}</FormHelp>
    </div>
  )
}
