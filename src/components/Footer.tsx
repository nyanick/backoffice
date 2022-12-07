import * as React from 'react';

type Props = {};
export const Footer: React.FC<Props> = ({}) => {
    return (
        <footer className="main-footer sticky z-50 inset-0">
            <strong>
                Copyright © 2019-{new Date().getFullYear()}.
            </strong>
            {'  '}All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 1.0.0
            </div>
        </footer>
    );
};
