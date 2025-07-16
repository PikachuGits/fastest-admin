// import { useState, useEffect } from "react";

// // 定义数据项接口
// interface DataItem {
//   id: number;
//   name: string;
//   description: string;
//   createdAt: string;
// }

// // 定义组件props接口
// interface LoadingComponentProps {
//   initialPage?: number;
//   itemsPerPage?: number;
//   totalPages?: number;
//   bulkPages?: number;
//   itemRenderer?: (item: DataItem) => React.ReactNode;
//   loadingComponent?: React.ReactNode;
//   loadingMoreComponent?: React.ReactNode;
//   endOfListComponent?: React.ReactNode;
//   errorComponent?: (error: string) => React.ReactNode;
// }

// // 加载指示器组件
// const LoadingIndicator: React.FC<{ size?: "small" | "large" }> = ({
//   size = "large",
// }) => {
//   return (
//     <div
//       className={`loader ${size === "large" ? "loader-large" : "loader-small"}`}
//     />
//   );
// };

// // 默认数据项渲染组件
// const DefaultDataItem: React.FC<{ item: DataItem }> = ({ item }) => {
//   return (
//     <div className="data-item">
//       <h3>{item.name}</h3>
//       <p>{item.description}</p>
//       <small>{new Date(item.createdAt).toLocaleDateString()}</small>
//     </div>
//   );
// };

// // 主加载组件
// const LoadingComponent: React.FC<LoadingComponentProps> = ({
//   initialPage = 1,
//   itemsPerPage = 20,
//   totalPages = 5,
//   bulkPages = 10,
//   itemRenderer = (item) => <DefaultDataItem item={item} />,
//   loadingComponent = <LoadingIndicator size="large" />,
//   loadingMoreComponent = (
//     <div className="loading-more">
//       <LoadingIndicator size="small" />
//       <span>加载更多数据...</span>
//     </div>
//   ),
//   endOfListComponent = <span>已加载全部数据</span>,
//   errorComponent = (error) => <div className="error-message">{error}</div>,
// }) => {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(initialPage);
//   const [hasMore, setHasMore] = useState(true);

//   // 模拟API请求延迟
//   const fetchData = async (pageNum: number): Promise<DataItem[]> => {
//     setIsLoading(true);
//     try {
//       // 模拟网络请求延迟
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // 生成模拟数据
//       const newItems = Array.from(
//         { length: itemsPerPage },
//         (_, i): DataItem => ({
//           id: (pageNum - 1) * itemsPerPage + i + 1,
//           name: `Item ${(pageNum - 1) * itemsPerPage + i + 1}`,
//           description: "This is a sample description for the item.",
//           createdAt: new Date().toISOString(),
//         })
//       );

//       // 模拟数据加载完的情况
//       if (pageNum > totalPages) {
//         setHasMore(false);
//         return [];
//       }

//       return newItems;
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 初始加载
//   useEffect(() => {
//     fetchData(page).then((newData) => {
//       setData(newData);
//     });
//   }, [page]);

//   // 加载更多
//   const handleLoadMore = () => {
//     if (!isLoading && hasMore) {
//       setPage((prev) => prev + 1);
//       fetchData(page + 1).then((newData) => {
//         setData((prev) => [...prev, ...newData]);
//       });
//     }
//   };

//   // 模拟一次性加载大量数据
//   const handleLoadAll = async () => {
//     setIsLoading(true);
//     setData([]);

//     try {
//       // 模拟加载大量数据的延迟
//       await new Promise((resolve) => setTimeout(resolve, 30000));

//       const allItems: DataItem[] = [];
//       for (let i = 1; i <= bulkPages; i++) {
//         const pageItems = Array.from(
//           { length: itemsPerPage },
//           (_, j): DataItem => ({
//             id: (i - 1) * itemsPerPage + j + 1,
//             name: `Bulk Item ${(i - 1) * itemsPerPage + j + 1}`,
//             description:
//               "This is a bulk loaded item with more data to process.",
//             createdAt: new Date().toISOString(),
//           })
//         );
//         allItems.push(...pageItems);
//       }

//       setData(allItems);
//       setHasMore(false);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="loading-component">
//       <div className="controls">
//         <button
//           className="load-more-btn"
//           onClick={handleLoadMore}
//           disabled={isLoading || !hasMore}
//         >
//           {isLoading ? "加载中..." : hasMore ? "加载更多" : "已加载全部数据"}
//         </button>

//         <button
//           className="load-all-btn"
//           onClick={handleLoadAll}
//           disabled={isLoading || !hasMore}
//         >
//           {isLoading ? "加载中..." : "一次性加载全部数据"}
//         </button>
//       </div>

//       {error && errorComponent(error)}

//       {isLoading && data.length === 0 && loadingComponent}

//       <div className="data-list">{data.map((item) => itemRenderer(item))}</div>

//       {isLoading && data.length > 0 && loadingMoreComponent}

//       {!hasMore && data.length > 0 && (
//         <div className="end-of-list">{endOfListComponent}</div>
//       )}
//     </div>
//   );
// };

// export default LoadingComponent;
