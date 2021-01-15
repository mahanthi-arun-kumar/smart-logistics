import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

function Profile() {

    const [visible, setVisible] = useState(false)

    return (
        <div>
            <Button icon>
                <Icon name='sidebar' />
            </Button>
        </div>
    )
}

export default Profile;