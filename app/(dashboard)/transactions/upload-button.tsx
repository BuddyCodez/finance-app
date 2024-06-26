import React from 'react'
import { Upload } from 'lucide-react';
import {useCSVReader} from "react-papaparse";
import { Button } from '@/components/ui/button';
type Props = {
    onUpload: (results: any) => void;
}
const UploadButton = ({onUpload}: Props) => {
  const {CSVReader} = useCSVReader();

  // TODO: add Paywall
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({getRootProps}: any) => (
        <Button
        size="sm"
        className='w-full lg:w-auto'
        {...getRootProps()}
        >
          <Upload className='size-4 mr-2' /> Import
        </Button>
      )}
    </CSVReader>
  )
}

export default UploadButton