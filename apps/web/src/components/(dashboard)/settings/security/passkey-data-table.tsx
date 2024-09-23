import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {AuthenticatorSchema} from '@repo/drizzle/schema/type';
import { format } from 'date-fns';

export type PasskeyDataTableProps = {
    authenticator: AuthenticatorSchema[]
}

export const PasskeyDataTable = ({authenticator}:PasskeyDataTableProps) => {
    return (
<div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">Device Type</TableHead>
            <TableHead className="text-right font-bold">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authenticator.map((auth) => (
            <TableRow key={auth.id}>
              <TableCell className="font-medium">{auth.id}</TableCell>
              <TableCell>{auth.credentialDeviceType}</TableCell>
              <TableCell className="text-right">
                {format(new Date(auth.createdAt), 'PPP')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    )
}