import React from 'react';
import {renderHook,act} from '@testing-library/react-hooks';
import UseIndexedDB from '../tools/indexedDBHook';

test('test', async () => {
    const { result } = renderHook(() => UseIndexedDB({'name':"myDBtest" ,'keyPath':"id"}));
    let [setData, getData, storeValue] = await result.current;
    expect(storeValue).toEqual([]);
    await act(() => setData({"id":1,"name":"John"}));
    [setData, getData, storeValue] = await result.current;
    expect(storeValue).toEqual([{"id":1,"name":"John"}]);
    await act(() => setData({"id":2,"name":"Maria"}));
    [setData, getData, storeValue] = await result.current;
    await act(() => getData(2));
    [setData, getData, storeValue] = await result.current;
    expect(storeValue[0]).toEqual({"id":2,"name":"Maria"});
    await act(() => getData());
    [setData, getData, storeValue] = await result.current;
    expect(storeValue).toEqual([{"id":1,"name":"John"},{"id":2,"name":"Maria"}]);
    await act(() => getData(3));
    [setData, getData, storeValue] = await result.current;
    expect(storeValue).toEqual(["not found"]);
    await act(() => setData({"id":3,"name":"Diego"}));
    await act(() => getData(3));
    [setData, getData, storeValue] = await result.current;
    expect(storeValue).toEqual([{"id":3,"name":"Diego"}]);
    await act(() => getData());
    [setData, getData, storeValue] = await result.current;
    expect(storeValue).toEqual([{"id":1,"name":"John"},{"id":2,"name":"Maria"},{"id":3,"name":"Diego"}]);

});




