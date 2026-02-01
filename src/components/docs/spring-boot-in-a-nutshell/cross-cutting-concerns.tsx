import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const RequestLifecycleDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Client
    participant Filter as Servlet Filter
    participant DS as DispatcherServlet
    participant Interceptor as Handler Interceptor
    participant Controller
    participant AOP as AOP Proxy
    participant Service as Service Logic

    Client->>Filter: HTTP Request
    Filter->>DS: doFilter()
    DS->>Interceptor: preHandle()
    Interceptor-->>DS: true (continue)
    DS->>Controller: handle()
    Controller->>AOP: method call
    AOP->>Service: invoke actual method
    Service-->>AOP: result
    AOP-->>Controller: result (+ advice executed)
    Controller-->>DS: ModelAndView / ResponseBody
    DS->>Interceptor: postHandle()
    Interceptor-->>DS: done
    DS-->>Filter: response
    DS->>Interceptor: afterCompletion()
    Filter-->>Client: HTTP Response`}
    />
  </ZoomContainer>
);

export const RequestLifecycleDiagramES = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Cliente as Cliente
    participant Filtro as Filtro Servlet
    participant DS as DispatcherServlet
    participant Interceptor as Interceptor de Manejador
    participant Controlador as Controlador
    participant AOP as Proxy AOP
    participant Servicio as Lógica de Servicio

    Cliente->>Filtro: Solicitud HTTP
    Filtro->>DS: doFilter()
    DS->>Interceptor: preHandle()
    Interceptor-->>DS: true (continuar)
    DS->>Controlador: handle()
    Controlador->>AOP: llamada al método
    AOP->>Servicio: invocar método real
    Servicio-->>AOP: resultado
    AOP-->>Controlador: resultado (+ advice ejecutado)
    Controlador-->>DS: ModelAndView / ResponseBody
    DS->>Interceptor: postHandle()
    Interceptor-->>DS: completado
    DS-->>Filtro: respuesta
    DS->>Interceptor: afterCompletion()
    Filtro-->>Cliente: Respuesta HTTP`}
    />
  </ZoomContainer>
);
