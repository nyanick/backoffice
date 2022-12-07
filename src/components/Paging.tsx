import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * > ul > li > button': {
            outline: 'none',
        }
    },
}));

interface PagingProps {
    page: number
    count: number,
    itemsPerPage: number,
    onPageChange: (event: any, value: any) => void
}

export const Paging: React.FC<PagingProps> = ({page, count, itemsPerPage, onPageChange}) => {
    const classes = useStyles();
    return (
        <div className={`flex ml-auto justify-end ${classes.root}`}>
            <Pagination
                page={page + 1}
                onChange={onPageChange}
                count={Math.ceil(count / itemsPerPage)}
                variant="outlined"
                shape="rounded"
            />
        </div>
    )
};