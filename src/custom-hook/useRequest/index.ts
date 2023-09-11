// import { useState, useEffect, useRef } from 'react';
// import lodash from 'lodash';

// interface Response {
//   data: object | null;
//   loading: boolean;
//   error: string | null;
// }

// interface RequestOptionsProps {
//   /*
//    * 手动开启
//    */
//   manual?: boolean;
//   /*
//    * 请求入参
//    */
//   params: object | string | string[];
//   /*
//    * 轮询
//    */
//   pollingInterval?: number | null;
//   /*
//   * 准备，用于依赖请求
//   */
//   ready?: boolean;
//   /*
//   * 防抖
//   */
//   debounceInterval?: number;
//   /*
//   * 节流
//   */
//   throttleInterval?: number;
//   /*
//    * 延迟loading为true的时间
//    */
//   loadingDelay?: number;
//   /*
//    * 依赖
//    */
//   refreshDeps?: any[];
//   /*
//    * 成功回调
//    */
//   onSuccess: (data: object | null) => void
// }

// type RequestType = (params: object | string | string[]) => Promise<Response>;

// function useRequest(request: RequestType, options: RequestOptionsProps) {
   
//   const [loading, setLoading] = useState<Boolean>(false);
//   const [data, setData] = useState<object | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const status = useRef<boolean>(false);
//   const pollingIntervalTimer = useRef<any | null>(null);

//   const { 
//     manual, 
//     params, 
//     pollingInterval, 
//     ready = true,
//     debounceInterval,
//     throttleInterval,
//     loadingDelay,
//     refreshDeps,
//     onSuccess 
//   } = options;

//   const runRequest  = async () => {
//     try {
//       if (!status.current) status.current = true;
//       if (pollingInterval && status.current) {
//         pollingIntervalTimer.current = setTimeout(() => {
//           status.current && runRequest();
//         }, pollingInterval)
//       }
//       const res = await request(params);
//       setData(res);
//       onSuccess && onSuccess(res);
//     } catch (err) {
//       error && setError(JSON.stringify(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 取消
//   const cancel = () => {
//     if (pollingIntervalTimer.current) {
//       clearTimeout(pollingIntervalTimer.current);
//       pollingIntervalTimer.current = null;
//       status.current && (status.current = false);
//     }
//   };

//   const start = () => {
//     if (debounceInterval) {
//       lodash.debounce(runRequest, debounceInterval)();
//     } else if (throttleInterval) {
//       lodash.throttle(runRequest, throttleInterval)();
//     } else {
//       runRequest();
//     }
//   }


//   useEffect(() => {
//     if (loadingDelay) {
//       setTimeout(() => {
//         status && setLoading(true);
//       }, loadingDelay)
//     }
//     setData(null);
//     setError(null);
//     !manual && ready && runRequest();
//   }, [manual, ready, ...(Array.isArray(refreshDeps) ? refreshDeps : [])])

//   return { data, error, loading, run: runRequest, cancel }
// }

// export default useRequest;

