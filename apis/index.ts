/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:17
 * @modify date 2024-11-16 04:48:17
 * @desc [description]
 */

import {
  collectionNames,
  DOCUMENT_LIMIT,
  RUN_QUERY_URL,
} from "@/constants/Apis";
import axios from "axios";

export const getRecentTransactions = () =>
  axios
    .post(RUN_QUERY_URL, {
      structuredQuery: {
        from: [
          {
            collectionId: collectionNames.transactions,
          },
        ],
        orderBy: [
          {
            field: {
              fieldPath: "_created",
            },
            direction: "DESCENDING",
          },
        ],
        limit: DOCUMENT_LIMIT,
      },
    })
    .then((response) => response.data);
