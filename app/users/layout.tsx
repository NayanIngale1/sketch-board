import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            users layout
            {children}
        </div>
    )
}

export default Layout
