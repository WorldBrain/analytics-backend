SELECT e1.id, ((e2.time - e1.time)/(1000*60.0)) AS "Stay time of user (mins)"
FROM events AS e1
INNER JOIN events AS e2
    ON e1.id = e2.id
WHERE e1.type = 'install'
        AND e2.type='uninstall'; 

-- Ouptut 
--  	id	                                    Stay time of user (mins)
-- 1	8ede1b63-dafe-43aa-9f2a-f9b1c195058b	4.56885
-- 2	4c77ad24-86fb-4ac2-b0af-6ffdc4cfb57e	68.76248333333334
-- 3	bc2272c2-a1c4-4cd4-9146-2811dfa44a0a	25.8499
-- 4	84c4bace-7268-4094-927c-f14e36a6b7e1	2.6805166666666667
-- 5	f2a9b9a3-117e-4619-9c2b-2176642216db	731.8833
-- 6	32324c15-5d82-4b7f-ac2b-5323b07053fb	1763.95415
-- 7	62b7787d-ff21-48c0-ad28-0c477f37c686	0.5248833333333334
-- 8	28d3afea-5642-4b38-9f24-18a28374fa0b	20.582816666666666
-- 9	7813e6d7-87b4-4d23-9abe-beb2ce6ce876	0.15546666666666667
-- 10	790b1792-c09b-4c1c-acd4-e2dfe1a91ac2	978.7697166666667
-- 11	427af1f5-ffb2-4869-b694-c258a871b28c	11.021166666666666
-- 12	7b2e3c1b-a942-4ea3-84b4-f600afc7c456	0.5435166666666666