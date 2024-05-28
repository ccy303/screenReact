import React from "react";
import { createRoot } from "react-dom/client";
import ViewItem from "dw/views/ViewItem/index";
import { observable } from "mobx";

(function () {
    const root = createRoot(document.getElementById("react-drag-root") as any);

    const Component = () => {
        const invokeKeyObserver = observable({
            invokeCallback: null
        });
        const loadingObserver = observable({
            loading: false
        });
        const deleteObserver = observable({
            deletes: []
        });
        return (
            <ViewItem
                model={{ test: 1 }}
                customProps={{ isShow: false }}
                invokeKeyObserver={invokeKeyObserver}
                loadingObserver={loadingObserver}
                deleteObserver={deleteObserver}
            />
        );
    };

    root.render(
        <div>
            <Component />
        </div>
    );
})();

// (function () {
//     const root = createRoot(document.getElementById("react-drag-root1") as any);

//     const Component = () => {
//         const invokeKeyObserver = observable({
//             invokeCallback: null
//         });
//         const loadingObserver = observable({
//             loading: false
//         });
//         const deleteObserver = observable({
//             deletes: []
//         });
//         return (
//             <ViewItem
//                 model={{ test: 1 }}
//                 customProps={{ isShow: false }}
//                 invokeKeyObserver={invokeKeyObserver}
//                 loadingObserver={loadingObserver}
//                 deleteObserver={deleteObserver}
//             />
//         );
//     };

//     root.render(
//         <div>
//             <Component />
//         </div>
//     );
// })();
