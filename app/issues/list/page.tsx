import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import IssueToolbar from './IssueToolbar'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: Promise<IssueQuery>
}

const IssuesPage = async ({ searchParams }: Props ) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const where = { status };
  
  const orderBy = columnNames
    .includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(resolvedSearchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction="column" gap="3">
      <IssueToolbar />
      <IssueTable searchParams={resolvedSearchParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage
