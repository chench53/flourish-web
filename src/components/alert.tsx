import { Alert } from "react-bootstrap";

export interface AlertInfo {
  variant?: string, 
  title?: string, 
  msg?: string,
  show: boolean,
  closeAlert: () => void
}

export function MyAlert(props: AlertInfo) {
  if (props.show) {
    return (
      <Alert variant={props.variant} onClose={props.closeAlert} dismissible>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
          {props.msg}
        </p>
      </Alert>
    );
  } else {
    return null
  }
}
